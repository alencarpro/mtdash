#!/usr/bin/env node
/**
 * scan-antigas.js
 * ────────────────────────────────────────────────────────────────────────────
 * Escaneia a pasta /antigas e converte os arquivos encontrados em definições
 * de dashboards estruturadas, salvando-as em /dashboards.
 *
 * Formatos suportados na pasta /antigas:
 *  - .json  → lido diretamente (array ou objeto com campos compatíveis)
 *  - .csv   → campo esperado: name, source_url, category, description, refresh_interval
 *  - .txt   → cada linha deve ser uma URL (nome extraído da URL)
 *
 * Uso:
 *   node scripts/scan-antigas.js
 *   node scripts/scan-antigas.js --dry-run   (exibe sem salvar)
 *
 * Saída:
 *   /dashboards/<slug-do-nome>.json  para cada dashboard encontrada
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ANTIGAS_DIR = path.join(ROOT, 'antigas');
const DASHBOARDS_DIR = path.join(ROOT, 'dashboards');
const DRY_RUN = process.argv.includes('--dry-run');

const VALID_CATEGORIES = ['ECONOMY', 'SOCIAL', 'ENVIRONMENT', 'WORKS', 'TRANSPARENCY', 'CUSTOM'];

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function inferCategory(name = '', url = '') {
  const text = (name + ' ' + url).toLowerCase();
  if (/transparên|licitaç|compra|contrat/.test(text)) return 'TRANSPARENCY';
  if (/orçament|fiscal|receita|despesa|sefaz|financ/.test(text)) return 'ECONOMY';
  if (/social|saúde|educaç|assistên|idhm|sedesc/.test(text)) return 'SOCIAL';
  if (/obra|infra|constru|seinfra/.test(text)) return 'WORKS';
  if (/ambient|desmata|queimada|sema/.test(text)) return 'ENVIRONMENT';
  return 'CUSTOM';
}

function buildDefinition(raw) {
  const category = VALID_CATEGORIES.includes((raw.category || '').toUpperCase())
    ? raw.category.toUpperCase()
    : inferCategory(raw.name, raw.source_url || raw.url);

  return {
    name: (raw.name || raw.title || 'Dashboard sem nome').trim(),
    description: (raw.description || raw.desc || '').trim() || null,
    category,
    source_url: (raw.source_url || raw.url || raw.link || '').trim(),
    refresh_interval: parseInt(raw.refresh_interval || raw.interval || '60', 10),
    status: raw.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE',
    thumbnail_url: raw.thumbnail_url || raw.thumbnail || null,
  };
}

// ─── Parsers por extensão ────────────────────────────────────────────────────

function parseJson(content) {
  const parsed = JSON.parse(content);
  const items = Array.isArray(parsed) ? parsed : [parsed];
  return items.map(buildDefinition).filter(d => d.source_url);
}

function parseCsv(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  return lines
    .slice(1)
    .map(line => {
      const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const raw = Object.fromEntries(headers.map((h, i) => [h, values[i] || '']));
      return buildDefinition(raw);
    })
    .filter(d => d.source_url);
}

function parseTxt(content) {
  return content
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('http'))
    .map(url => {
      const urlObj = new URL(url);
      const name = urlObj.hostname.replace(/^www\./, '') + urlObj.pathname;
      return buildDefinition({ name, source_url: url });
    });
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(ANTIGAS_DIR)) {
    console.error(`❌  Pasta não encontrada: ${ANTIGAS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(ANTIGAS_DIR).filter(f => /\.(json|csv|txt)$/i.test(f));

  if (files.length === 0) {
    console.log('⚠️  Nenhum arquivo .json, .csv ou .txt encontrado em /antigas.');
    console.log('   Adicione arquivos nessa pasta e rode o script novamente.');
    return;
  }

  let total = 0;
  const saved = [];
  const errors = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(ANTIGAS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    let definitions = [];
    try {
      if (ext === '.json') definitions = parseJson(content);
      else if (ext === '.csv') definitions = parseCsv(content);
      else if (ext === '.txt') definitions = parseTxt(content);
    } catch (err) {
      errors.push(`  ${file}: ${err.message}`);
      continue;
    }

    for (const def of definitions) {
      if (!def.source_url) continue;
      const filename = slugify(def.name) + '.json';
      const dest = path.join(DASHBOARDS_DIR, filename);

      if (DRY_RUN) {
        console.log(`[DRY RUN] ${filename}:`, JSON.stringify(def, null, 2));
      } else {
        if (!fs.existsSync(DASHBOARDS_DIR)) fs.mkdirSync(DASHBOARDS_DIR, { recursive: true });
        fs.writeFileSync(dest, JSON.stringify(def, null, 2) + '\n', 'utf-8');
      }

      saved.push(filename);
      total++;
    }
  }

  // Relatório
  console.log('\n━━━ Scan Antigas ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📂  Arquivos processados : ${files.length}`);
  console.log(`✅  Dashboards extraídas : ${total}${DRY_RUN ? ' (dry-run, não salvas)' : ''}`);
  if (saved.length) {
    console.log('\n   Arquivos gerados em /dashboards:');
    saved.forEach(f => console.log(`   • ${f}`));
  }
  if (errors.length) {
    console.log('\n❌  Erros:');
    errors.forEach(e => console.log(e));
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (!DRY_RUN && total > 0) {
    console.log('💡  Próximo passo: acesse o Painel Admin → Organização → Importar');
    console.log('    para inserir as dashboards geradas no banco de dados.\n');
  }
}

main();

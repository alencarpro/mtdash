-- Tabela para armazenar o cache dos dados da API
CREATE TABLE IF NOT EXISTS public.external_api_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint TEXT NOT NULL UNIQUE,
    payload JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.external_api_data ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública (as dashboards precisam ler isso)
CREATE POLICY "Leitura pública de dados da API" 
ON public.external_api_data 
FOR SELECT 
USING (true);

-- Função para atualizar o timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar o timestamp
CREATE TRIGGER update_external_api_data_updated_at
    BEFORE UPDATE ON public.external_api_data
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
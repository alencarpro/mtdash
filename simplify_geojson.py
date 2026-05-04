import json

def simplify_geometry(geometry, precision=4):
    if geometry is None:
        return None
    
    def round_coords(coords):
        if isinstance(coords[0], (int, float)):
            return [round(c, precision) for c in coords]
        return [round_coords(c) for c in coords]

    geometry['coordinates'] = round_coords(geometry['coordinates'])
    return geometry

with open('public/data/mt-municipalities.json', 'r') as f:
    data = json.load(f)

for feature in data['features']:
    # Mantém apenas propriedades essenciais para reduzir tamanho
    props = feature['properties']
    new_props = {}
    # Busca nomes comuns em geojsons brasileiros
    for key in ['name', 'NM_MUNICIP', 'NM_MUN', 'NM_MUNICIPIO', 'description']:
        if key in props:
            new_props['name'] = props[key]
            break
    feature['properties'] = new_props
    
    # Simplifica coordenadas arredondando para 4 casas decimais (~11m de precisão)
    feature['geometry'] = simplify_geometry(feature['geometry'], precision=4)

with open('public/data/mt-municipalities.json', 'w') as f:
    json.dump(data, f, separators=(',', ':'))

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { scaleLinear } from 'd3-scale';

const geoUrl = "https://raw.githubusercontent.com/tbicudo/geojson-brasil/master/cities/mt.json";

interface MTMapProps {
  data: { city: string; value: number }[];
  title: string;
  colorScale?: string[];
  unit?: string;
  isLowerBetter?: boolean;
}

const MTMap: React.FC<MTMapProps> = ({ 
  data, 
  colorScale = ["#f87171", "#86efac"], 
  unit = "", 
  isLowerBetter = false 
}) => {
  const [tooltip, setTooltip] = useState<{ x: number, y: number, name: string, value: string, rank: string, status: string, visible: boolean }>({ 
    x: 0, y: 0, name: '', value: '', rank: '', status: '', visible: false 
  });

  const values = data.map(d => d.value);
  const min = values.length ? Math.min(...values) : 0;
  const max = values.length ? Math.max(...values) : 100;

  const colorMapper = scaleLinear<string>()
    .domain(isLowerBetter ? [max, min] : [min, max])
    .range(colorScale as any);

  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="flex-1 min-h-0">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 3000, center: [-56, -13] }}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const cityName = geo.properties.name;
                 const cityData = data.find(item => item.city.toLowerCase() === cityName.toLowerCase());
 
                let rankVal = 0;
                let statusVal = "";
                if (cityData) {
                  const sorted = [...data].sort((a, b) => isLowerBetter ? a.value - b.value : b.value - a.value);
                  rankVal = sorted.findIndex(item => item.city.toLowerCase() === cityData.city.toLowerCase()) + 1;
                  statusVal = isLowerBetter ? (cityData.value < 12 ? "Índice Positivo" : "Índice Negativo") : (cityData.value > 95 ? "Índice Positivo" : "Índice Negativo");
                }

                const fillColor = cityData ? colorMapper(cityData.value) : '#1e293b';
                const centroid = geoCentroid(geo);

                return (
                  <React.Fragment key={geo.rsmKey}>
                    <Geography
                      geography={geo}
                      onMouseEnter={(event) => {
                        setTooltip({
                          x: event.clientX,
                          y: event.clientY,
                          name: cityName,
                          value: cityData ? `${cityData.value}${unit}` : 'Sem dados',
                          rank: rankVal > 0 ? `${rankVal}º em MT` : '',
                          status: statusVal,
                          visible: true
                        });
                      }}
                      onMouseMove={(event) => {
                        setTooltip(prev => ({ ...prev, x: event.clientX, y: event.clientY }));
                      }}
                      onMouseLeave={() => {
                        setTooltip(prev => ({ ...prev, visible: false }));
                      }}
                      style={{
                        default: { fill: fillColor, stroke: "#0f172a", strokeWidth: 0.2, outline: "none" },
                        hover: { fill: fillColor, stroke: "#fff", strokeWidth: 1, outline: "none", cursor: "pointer" },
                        pressed: { fill: fillColor, outline: "none" }
                      }}
                    />
                    {rankVal > 0 && rankVal <= 30 && (
                      <Marker coordinates={centroid}>
                        <g transform="translate(0, 0)">
                          <text
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ 
                              fontSize: "7px", 
                              fill: "#000", 
                              fontWeight: "bold",
                              fontFamily: "monospace",
                              pointerEvents: "none",
                              textShadow: "0 0 1px rgba(255,255,255,0.5)"
                            }}
                          >
                            {rankVal}
                          </text>
                        </g>
                      </Marker>
                    )}
                  </React.Fragment>
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1 bg-black/40 p-2 rounded backdrop-blur-sm border border-white/10">
        <div 
          className="h-2 w-24 rounded" 
          style={{ background: `linear-gradient(to right, ${colorScale[0]}, ${colorScale[1]})` }}
        />
        <div className="flex justify-between text-[10px] text-white/80 font-mono">
          <span>{isLowerBetter ? max : min}{unit}</span>
          <span>{isLowerBetter ? min : max}{unit}</span>
        </div>
      </div>

      {tooltip.visible && (
        <div 
          style={{
            position: 'fixed',
            left: tooltip.x + 15,
            top: tooltip.y + 15,
            backgroundColor: 'rgba(10,17,30,0.95)',
            border: '1px solid rgba(141,243,219,0.3)',
            borderRadius: '4px',
            padding: '6px 10px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 600,
            pointerEvents: 'none',
            zIndex: 9999,
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          <div className="flex flex-col gap-1">
            <div className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">{tooltip.name}</div>
            <div className="text-[16px] font-bold text-white">{tooltip.value}</div>
            {tooltip.rank && (
              <div className="flex items-center gap-2 mt-1 pt-1 border-t border-white/10">
                <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 rounded text-[10px] font-bold">{tooltip.rank}</span>
                <span className={`text-[10px] font-bold ${tooltip.status === 'Índice Positivo' ? 'text-green-400' : 'text-red-400'}`}>
                  {tooltip.status}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MTMap;

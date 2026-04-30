import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { scaleLinear } from 'd3-scale';

const geoUrl = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

interface BrazilMapProps {
  data: { state: string; value: number }[];
  title: string;
  colorScale?: string[];
  unit?: string;
  isLowerBetter?: boolean;
}

const BrazilMap: React.FC<BrazilMapProps> = ({ 
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
          projectionConfig={{ scale: 800, center: [-55, -15] }}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name;
                const stateSigla = geo.properties.sigla;
                 const stateData = data.find(item => item.state === stateName || item.state === stateSigla);
                 
                let rankVal = 0;
                let statusVal = "";
                if (stateData) {
                  const sorted = [...data].sort((a, b) => isLowerBetter ? a.value - b.value : b.value - a.value);
                  rankVal = sorted.findIndex(item => item.state === stateData.state) + 1;
                  statusVal = isLowerBetter ? (stateData.value < 12 ? "Índice Positivo" : "Índice Negativo") : (stateData.value > 90 ? "Índice Positivo" : "Índice Negativo");
                }

                const fillColor = stateData ? colorMapper(stateData.value) : '#1e293b';
                const centroid = geoCentroid(geo);

                return (
                  <React.Fragment key={geo.rsmKey}>
                    <Geography
                      geography={geo}
                    onMouseEnter={(event) => {
                      setTooltip({
                        x: event.clientX,
                        y: event.clientY,
                        name: stateName,
                        value: stateData ? `${stateData.value}${unit}` : 'Sem dados',
                        rank: rankVal > 0 ? `${rankVal}º no BR` : '',
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
                        default: { fill: fillColor, stroke: "#0f172a", strokeWidth: 0.5, outline: "none" },
                        hover: { fill: fillColor, stroke: "#fff", strokeWidth: 1.5, outline: "none", cursor: "pointer" },
                        pressed: { fill: fillColor, outline: "none" }
                      }}
                    />
                    {rankVal > 0 && rankVal <= 27 && (
                      <Marker coordinates={centroid}>
                        <g transform="translate(0, 0)">
                          <text
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ 
                              fontSize: "12px", 
                              fill: "#000", 
                              fontWeight: "bold",
                              fontFamily: "monospace",
                              pointerEvents: "none",
                              textShadow: "0 0 2px rgba(255,255,255,0.5)"
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
      
      {/* Legend - Below the map */}
      <div className="mt-4 mx-auto w-1/2 flex flex-col gap-1.5 bg-black/40 p-3 rounded-lg backdrop-blur-md border border-white/10">
        <div className="flex justify-between text-[11px] text-white/90 font-bold mb-0.5 px-0.5">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colorScale[0] }}></span>
            {isLowerBetter ? max : min}{unit}
          </span>
          <span className="flex items-center gap-1">
            {isLowerBetter ? min : max}{unit}
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colorScale[1] }}></span>
          </span>
        </div>
        <div 
          className="h-2.5 w-full rounded-full shadow-inner" 
          style={{ background: `linear-gradient(to right, ${colorScale[0]}, ${colorScale[1]})` }}
        />
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

export default BrazilMap;

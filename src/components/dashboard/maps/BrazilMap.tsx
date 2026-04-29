import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
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
  const [tooltip, setTooltip] = useState<{ x: number, y: number, text: string, visible: boolean }>({ x: 0, y: 0, text: '', visible: false });

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
                const stateData = data.find(item => 
                  item.state === stateName || item.state === stateSigla
                );
                const fillColor = stateData ? colorMapper(stateData.value) : '#1e293b';

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(event) => {
                      setTooltip({
                        x: event.clientX,
                        y: event.clientY,
                        text: `${stateName}: ${stateData ? stateData.value + unit : 'Sem dados'}`,
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
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default BrazilMap;

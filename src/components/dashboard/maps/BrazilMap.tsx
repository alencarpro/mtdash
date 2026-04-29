import React, { useEffect, useState, useRef } from 'react';
import * as d3Geo from 'd3-geo';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';

interface BrazilMapProps {
  data: { state: string; value: number }[];
  title: string;
  colorScale?: string[];
  unit?: string;
  isLowerBetter?: boolean;
}

const BrazilMap: React.FC<BrazilMapProps> = ({ 
  data, 
  title, 
  colorScale = ["#f87171", "#86efac"], 
  unit = "", 
  isLowerBetter = false 
}) => {
  const [geoData, setGeoData] = useState<any>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number, y: number, text: string, visible: boolean }>({ x: 0, y: 0, text: '', visible: false });

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson')
      .then(response => response.json())
      .then(json => setGeoData(json));
  }, []);

  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    const svgElement = svgRef.current;
    const width = svgElement.clientWidth;
    const height = svgElement.clientHeight;
    const svg = d3Selection.select(svgElement);

    const projection = d3Geo.geoMercator()
      .fitSize([width, height], geoData);

    const pathGenerator = d3Geo.geoPath().projection(projection);

    const values = data.map(d => d.value);
    const min = values.length ? Math.min(...values) : 0;
    const max = values.length ? Math.max(...values) : 100;

    const color = d3Scale.scaleLinear<string>()
      .domain(isLowerBetter ? [max, min] : [min, max])
      .range(colorScale as any);

    svg.selectAll('path')
      .data(geoData.features)
      .join('path')
      .attr('d', pathGenerator as any)
      .attr('fill', (d: any) => {
        const stateData = data.find(item => 
          item.state === d.properties.name || 
          item.state === d.properties.sigla
        );
        return stateData ? color(stateData.value) : '#1e293b';
      })
      .attr('stroke', '#0f172a')
      .attr('stroke-width', 0.5)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d: any) {
        const stateData = data.find(item => 
          item.state === d.properties.name || 
          item.state === d.properties.sigla
        );
        d3Selection.select(this).attr('stroke-width', 1.5).attr('stroke', '#fff');
        setTooltip({
          x: event.clientX,
          y: event.clientY,
          text: `${d.properties.name}: ${stateData ? stateData.value + unit : 'Sem dados'}`,
          visible: true
        });
      })
      .on('mousemove', (event) => {
        setTooltip(prev => ({ ...prev, x: event.clientX, y: event.clientY }));
      })
      .on('mouseout', function() {
        d3Selection.select(this).attr('stroke-width', 0.5).attr('stroke', '#0f172a');
        setTooltip(prev => ({ ...prev, visible: false }));
      });

    // Draw Legend
    svg.select('.legend-group').remove();
    const legendGroup = svg.append('g').attr('class', 'legend-group').attr('transform', `translate(20, ${height - 100})`);
    
    const legendWidth = 100;
    const legendHeight = 10;
    
    const gradientId = 'legend-gradient-' + Math.random().toString(36).substr(2, 9);
    const defs = svg.select('defs').empty() ? svg.append('defs') : svg.select('defs');
    const linearGradient = defs.append('linearGradient').attr('id', gradientId);
    
    linearGradient.append('stop').attr('offset', '0%').attr('stop-color', colorScale[0]);
    linearGradient.append('stop').attr('offset', '100%').attr('stop-color', colorScale[1]);
    
    legendGroup.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', `url(#${gradientId})`);
      
    legendGroup.append('text')
      .attr('x', 0)
      .attr('y', legendHeight + 15)
      .attr('fill', '#f8fafc')
      .attr('font-size', '10px')
      .text(isLowerBetter ? max + unit : min + unit);
      
    legendGroup.append('text')
      .attr('x', legendWidth)
      .attr('y', legendHeight + 15)
      .attr('text-anchor', 'end')
      .attr('fill', '#f8fafc')
      .attr('font-size', '10px')
      .text(isLowerBetter ? min + unit : max + unit);

  }, [geoData, data, colorScale, unit, isLowerBetter]);

  return (
    <>
      <svg ref={svgRef} className="w-full h-full" />
      {tooltip.visible && (
        <div 
          style={{
            position: 'fixed',
            left: tooltip.x + 10,
            top: tooltip.y + 10,
            backgroundColor: 'rgba(10,17,30,0.95)',
            border: '1px solid rgba(141,243,219,0.3)',
            borderRadius: '4px',
            padding: '4px 8px',
            color: '#fff',
            fontSize: '14px',
            pointerEvents: 'none',
            zIndex: 9999,
            backdropFilter: 'blur(4px)'
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
};

export default BrazilMap;

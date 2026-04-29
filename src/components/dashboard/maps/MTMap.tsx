import React, { useEffect, useState, useRef } from 'react';
import * as d3Geo from 'd3-geo';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';

interface MTMapProps {
  data: { city: string; value: number }[];
  title: string;
  colorScale?: string[];
}

const MTMap: React.FC<MTMapProps> = ({ data, title, colorScale = ["#8df3db", "#60a5fa"] }) => {
  const [geoData, setGeoData] = useState<any>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/tbicudo/geojson-brasil/master/cities/mt.json')
      .then(response => response.json())
      .then(json => setGeoData(json));
  }, []);

  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    const svg = d3Selection.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const projection = d3Geo.geoMercator()
      .fitSize([width, height], geoData);

    const pathGenerator = d3Geo.geoPath().projection(projection);

    const values = data.map(d => d.value);
    const min = values.length ? Math.min(...values) : 0;
    const max = values.length ? Math.max(...values) : 100;

    const color = d3Scale.scaleLinear<string>()
      .domain([min, max])
      .range(colorScale as any);

    svg.selectAll('path')
      .data(geoData.features)
      .join('path')
      .attr('d', pathGenerator as any)
      .attr('fill', (d: any) => {
        const cityData = data.find(item => 
          item.city.toLowerCase() === d.properties.name.toLowerCase()
        );
        return cityData ? color(cityData.value) : '#1e293b';
      })
      .attr('stroke', '#0f172a')
      .attr('stroke-width', 0.2)
      .style('cursor', 'pointer')
      .on('mouseover', function() {
        d3Selection.select(this).attr('stroke-width', 1).attr('stroke', '#fff');
      })
      .on('mouseout', function() {
        d3Selection.select(this).attr('stroke-width', 0.2).attr('stroke', '#0f172a');
      });
  }, [geoData, data, colorScale]);

  return <svg ref={svgRef} className="w-full h-full" />;
};

export default MTMap;

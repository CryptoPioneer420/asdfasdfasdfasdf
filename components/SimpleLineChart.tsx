
import React from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface SimpleLineChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ data, color = "#0d9488", height = 200 }) => {
  if (data.length < 2) return null;

  const width = 1000; // internal viewBox width
  const padding = 40;
  
  const values = data.map(d => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal;

  // Coordinate Calculation
  const getX = (index: number) => padding + (index / (data.length - 1)) * (width - 2 * padding);
  const getY = (value: number) => height - padding - ((value - minVal) / (range || 1)) * (height - 2 * padding);

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  
  // Fill area path
  const fillPath = `M${getX(0)},${height} L${points} L${getX(data.length - 1)},${height} Z`;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
         {/* Gradient Def */}
         <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor={color} stopOpacity="0.2"/>
               <stop offset="100%" stopColor={color} stopOpacity="0"/>
            </linearGradient>
         </defs>

         {/* Grid Lines */}
         <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#e5e7eb" strokeDasharray="4 4" />
         <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e5e7eb" />

         {/* Area Fill */}
         <path d={fillPath} fill="url(#chartGradient)" stroke="none" />

         {/* Line */}
         <polyline fill="none" stroke={color} strokeWidth="3" points={points} strokeLinecap="round" strokeLinejoin="round" />

         {/* Labels (Simplified - First, Middle, Last) */}
         <text x={getX(0)} y={height - 10} textAnchor="start" className="text-xs fill-gray-400">{data[0].label}</text>
         <text x={getX(Math.floor(data.length / 2))} y={height - 10} textAnchor="middle" className="text-xs fill-gray-400">{data[Math.floor(data.length/2)].label}</text>
         <text x={getX(data.length - 1)} y={height - 10} textAnchor="end" className="text-xs fill-gray-400">{data[data.length - 1].label}</text>
         
         {/* Y-Axis Labels (Max/Min) */}
         <text x={padding - 5} y={getY(maxVal) + 5} textAnchor="end" className="text-xs fill-gray-500 font-bold">${maxVal.toFixed(2)}</text>
         <text x={padding - 5} y={getY(minVal) - 5} textAnchor="end" className="text-xs fill-gray-500 font-bold">${minVal.toFixed(2)}</text>

      </svg>
    </div>
  );
};

export default SimpleLineChart;

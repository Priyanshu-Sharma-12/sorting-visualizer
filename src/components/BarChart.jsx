import React from 'react';
import './BarChart.css';

const BarChart = ({ array, barColors }) => {
  return (
    <div className="bar-chart">
      {array.map((value, index) => (
        <div
          key={index}
          className="bar"
          style={{
            height: `${value}px`,
            backgroundColor: barColors[index] || 'steelblue',
          }}
        ></div>
      ))}
    </div>
  );
};

export default BarChart;
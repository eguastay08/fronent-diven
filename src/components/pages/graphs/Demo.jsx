import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

function BarChart() {
  const chartRef = useRef(null);
  const [data, setData] = useState([120, 200, 150, 80, 70, 110, 130]);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (chart) {
      chart.dispose();
    }
    const newChart = echarts.init(chartRef.current);
    setChart(newChart);
    newChart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: data,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    });
  }, [data]);

  return (
    <div>
      <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
      <button onClick={() => setData([Math.random() * 1000, Math.random() * 1000, Math.random() * 1000, Math.random() * 1000, Math.random() * 1000, Math.random() * 1000, Math.random() * 1000])}>
        Update Data
      </button>
    </div>
  );
}

export default BarChart;


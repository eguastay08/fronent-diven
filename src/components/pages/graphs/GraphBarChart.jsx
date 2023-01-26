import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useRef, useState} from "react";
import * as echarts from "echarts";

const GraphBarChart=(props)=>{
  const {question,options, answers}=props
  const [chart, setChart] = useState(null);
  const chartRef = useRef(null);

  const colors=[
    '#2e8bbe',
    '#62b3df',
    '#2e89bb',
    '#627bdf',
    '#43d3a1',
    '#54be76',
    '#7d62df',
  ];

  useEffect(() => {
    console.log(options)
    console.log(answers)
    if (chart) {
      chart.dispose();
    }
    const newChart = echarts.init(chartRef.current);
    setChart(newChart);
    newChart.setOption({
      xAxis: {
        type: 'category',
        data: options
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: answers,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    });
  },[question]);


  return <>
    <h3>{question.question}</h3>
    <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
  </>
}

export default GraphBarChart

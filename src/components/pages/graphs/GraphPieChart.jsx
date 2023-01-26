import {useEffect, useRef, useState} from "react";
import * as echarts from "echarts";

const GraphPieChart=(props)=>{
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
    if (chart) {
      chart.dispose();
    }
    const newChart = echarts.init(chartRef.current);
    setChart(newChart);
    console.log(answers)
    newChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data:answers,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
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

export default GraphPieChart

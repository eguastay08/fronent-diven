import {useEffect, useRef, useState} from "react";
import * as echarts from "echarts";
import styles from "./style.module.scss";

const GraphPieChart=(props)=>{
  const {question,options, answers}=props
  const [chart, setChart] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chart) {
      chart.dispose();
    }
    const newChart = echarts.init(chartRef.current);
    setChart(newChart);
    console.log(answers)
    newChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          var percent = ((params.value / answers.reduce((a, b) => a + b.value, 0)) * 100).toFixed(2);
          return `${params.name}: ${params.value} (${percent}%)`;
        }
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        formatter: function(name) {
          var value = 0;
          answers.forEach(function(answer) {
            if (answer.name === name) {
              value = answer.value;
            }
          });
          var percent = ((value / answers.reduce((a, b) => a + b.value, 0)) * 100).toFixed(2);
          return `${name} => (${percent}%)`;
        }
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
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              width:'100%'
            }
          }
        }
      ]
    });
  },[question]);


  return <>
    <h3 className={styles.title}>{question.question}</h3>
    <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
  </>
}

export default GraphPieChart

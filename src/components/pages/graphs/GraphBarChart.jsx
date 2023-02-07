import {useEffect, useRef, useState} from "react";
import * as echarts from "echarts";
import styles from './style.module.scss'
const GraphBarChart=(props)=>{
  const {question,options, answers}=props
  const [chart, setChart] = useState(null);
  const chartRef = useRef(null);
  

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
    <h3 className={styles.title}>{question.question}</h3>
    <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
  </>
}

export default GraphBarChart

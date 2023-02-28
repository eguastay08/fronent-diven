import {useEffect, useRef, useState} from 'react';
import * as echarts from "echarts";
import wordcloud from 'echarts-wordcloud';
import question from "../surveyedit/Question";
import styles from "./style.module.scss";

const GraphWordCloudChart = (props) => {
  const chartRef = useRef(null);
  const {question}=props
  const [chart, setChart] = useState(null);

      useEffect(() => {
        if (chart) {
          chart.dispose();
        }

        const newChart = echarts.init(chartRef.current);
        setChart(newChart);
    const option = {
      series: [{
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,
        sizeRange: [12, 60],
        rotationRange: [-90, 90],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        textStyle: {
          normal: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: function () {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333',
            width: '100%'
          }
        },
        data: question?.data??[]
      }]
    };

        newChart.setOption(option);
  }, [question]);

  return <>
    <h3 className={styles.title}>{question.question}</h3>
    <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
  </>
};

export default GraphWordCloudChart;

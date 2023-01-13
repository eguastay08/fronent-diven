import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect} from "react";

const GraphBarChart=(props)=>{
  const {data,question,options}=props

  useEffect(() => {
    console.log('Componente montado' +question);
    return () => {
      console.log('Componente desmontado' +question);
    };
  }, []);

  const colors=[
    '#2e8bbe',
    '#62b3df',
    '#2e89bb',
    '#627bdf',
    '#43d3a1',
    '#54be76',
    '#7d62df',
  ];

  return <>
    <h3>{question}</h3>
    <BarChart
      width={700}
      height={500}
      data={[]}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Legend />
      {
        options?.map((e,key)=>{
          const color = colors[Math.floor(Math.random() * colors.length)];
          return <Bar key={key} dataKey={e} fill={color} background={{ fill: "#eee" }} />
        })
      }
    </BarChart>
  </>
}

export default GraphBarChart

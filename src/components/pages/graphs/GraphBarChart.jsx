import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

const GraphBarChart=(props)=>{
  const {data,question,options}=props

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
      data={data}
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
      <Tooltip />
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

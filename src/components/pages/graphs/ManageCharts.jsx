import GraphBarChart from "./GraphBarChart";
import GraphPieChart from "./GraphPieChart";
import GraphWordCloudChart from "./GraphWordCloudChart";

const ManageCharts=(props)=>{
  const {question,options, answers,tot_answers}=props
  switch (question?.type){
    case 'checkboxes':
      return <GraphBarChart
        question={question}
        options={options}
        answers={answers}
        tot_answers={tot_answers}
      />
      break;
    case 'dropdown':
    case 'multiple_choice':
      return <GraphPieChart
        question={question}
        options={options}
        answers={answers}
        tot_answers={tot_answers}
      />
      break;
    case 'short_answer':
    case 'long_text':
      return <GraphWordCloudChart
        question={question}
        options={options}
        answers={answers}
        tot_answers={tot_answers}
      />
      break;
      default:
      return<p>Grafico no soportado</p>
      break;
  }
}

export default ManageCharts

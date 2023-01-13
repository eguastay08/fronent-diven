import style from "./style.module.scss"
import style_menu from "../../../styles/styles.module.scss";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import store from "../../../redux/store";
import {getGraphs, getProject, getResponses, getSurvey} from "../../../redux/actionCreators";
import {useEffect, useState} from "react";
import GraphBarChart from "./GraphBarChart";

const Graphs=(props,match)=>{
  const { id } = useParams()
  const{project,survey,graphs}=props
  const [surveyname, setSurveyName] = useState('');
  const [number_question, setNumberQuestion] = useState(1);
  const [tot_questions, setTotQuestions] = useState(null);
  const [currentGraph, setCurrentGraph] = useState(<div>Sin grafico</div>);


  useEffect(() => {
    store.dispatch(getSurvey(id))
  }, [match]);

  useEffect(() => {
    if(survey.survey){
      store.dispatch(getProject(survey.survey.cod_project))
      store.dispatch(getGraphs(survey.survey.cod_survey))
      setSurveyName(survey.survey.name)
    }
  }, [survey]);

  useEffect(() => {
    if(graphs.graphs){
      setTotQuestions(graphs.graphs.length)
    }
  }, [graphs]);

  useEffect(() => {
    if(graphs.graphs){
      const gr=graphs.graphs
      const ans = gr[number_question].answers
      console.log(ans)
      const dat = [
        {
          name: gr[number_question]?.question,
          ...ans
        }
      ];
        setCurrentGraph(
          <GraphBarChart
            data={dat}
            question={gr[number_question]?.question}
            options={gr[number_question]?.options}
          />
        )
    }
  }, [number_question,graphs]);



  const handleClickNext=()=>{
    if(number_question<tot_questions-1){
      setNumberQuestion(number_question+1);
    }
  }

  const handleClickBack=()=>{
    if(number_question>0){
      setNumberQuestion(number_question-1);
    }
  }

  return(
    <div className="card">
      <div className="card-header">
        <div className={style.row}>
          <div className={style_menu.page_navbar}>
            <nav>
              <ol className={style_menu.breadcrumb}>
                <li>
                  <Link to="/home">Inicio</Link>
                </li>
                <li>
                  <Link to="/projects">Proyectos</Link>
                </li>
                <li>
                  <span>{project?.project?.name}</span>
                </li>
                <li>
                  <Link to={`/projects/${project?.project?.cod_project}/surveys`}>Encuestas</Link>
                </li>
                <li>
                  <span>{surveyname}</span>
                </li>
                <li>
                  <span>Gráficos</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="card-body py-3" style={{ background: '#F3F5F8'}}>
        <div className={style.container}>
          {!tot_questions?<h1>No existen preguntas</h1>:
            <>
              {currentGraph?currentGraph:<div>Sin grafico</div>}
              <div>
                <button onClick={handleClickBack}>Anterior</button>
                <button onClick={handleClickNext}>Siguiente</button>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  survey: state.SurveyState,
  //project
  project:state.ProjectState,
  graphs:state.GraphsState,
})

const mapDispatchProps={

}

export default connect(mapStateToProps, mapDispatchProps)(Graphs)

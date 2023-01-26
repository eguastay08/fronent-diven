import style from "./style.module.scss"
import style_menu from "../../../styles/styles.module.scss";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import store from "../../../redux/store";
import {getGraphs, getProject, getResponses, getSurvey} from "../../../redux/actionCreators";
import {useEffect, useRef, useState} from "react";
import * as echarts from "echarts";
import GraphBarChart from "./GraphBarChart";
import ManageCharts from "./ManageCharts";


const Graphs=(props,match)=>{
    const {id} = useParams()
    const {project, survey, graphs} = props
    const [surveyname, setSurveyName] = useState('');
    const [number_question, setNumberQuestion] = useState(0);
    const [tot_questions, setTotQuestions] = useState(null);
    const [question, setQuestion] = useState();
    const [options, setOptions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      store.dispatch(getSurvey(id))
    }, [match]);

    useEffect(() => {
      setLoading(true)
      if (survey.survey) {
        store.dispatch(getProject(survey.survey.cod_project))
        store.dispatch(getGraphs(survey.survey.cod_survey))
        setSurveyName(survey.survey.name)
        setLoading(false)
      }
    }, [survey]);

    useEffect(() => {
      if (graphs.graphs) {
        setTotQuestions(graphs.graphs.length)
      }
    }, [graphs]);

    useEffect(() => {

      if (graphs.graphs) {
        const gr = graphs.graphs
        setQuestion(gr[number_question]??'Sin Preguntas')
        setOptions(gr[number_question]?.options??[])
        setAnswers(gr[number_question]?.answers??gr[number_question]?.data??[])
        console.log(gr[number_question])
       // setLoading(false)
      }
    }, [number_question, graphs]);


    const handleClickNext = () => {
      if (number_question < tot_questions - 1) {
        setNumberQuestion(number_question + 1);
      }
    }

    const handleClickBack = () => {
      if (number_question > 0) {
        setNumberQuestion(number_question - 1);
      }
    }

    return (
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
        <div className="card-body py-3" style={{background: '#F3F5F8'}}>
          <div className={style.container}>
              <>
                {
                  loading?<p>Cargando...</p>:
                    <ManageCharts
                      question={question}
                      options={options}
                      answers={answers}
                    />
                }
                <div>
                  <button onClick={handleClickBack}>Anterior</button>
                  <button onClick={handleClickNext}>Siguiente</button>
                </div>
              </>
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

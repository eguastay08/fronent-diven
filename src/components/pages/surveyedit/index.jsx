import {
  deleteQuestion, deleteSection, getProject,
  getSurvey,
  postQuestion,
  postSection,
  putQuestion,
  putSection
} from "../../../redux/actionCreators";
import {connect} from "react-redux";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import store from "../../../redux/store";
import style from "./styles.module.scss";
import Section from "./Section";
import {FaListOl, FaPlusCircle} from "react-icons/fa";
import Question from "./Question";
import alertify from "alertifyjs";
import style_menu from "../../../styles/styles.module.scss";
import {getProject as ProjectState} from "../../../redux/reducers";

const SurveyEdit=(props)=>{
  const { id } = useParams()
  const{match,survey,postsection,putsection,deletequestion,deletesection,putquestion,postquestion,scrooltop,userloggedin,project}=props
  const [surveyname, setSurveyName] = useState('');
  const [top, setTop] = useState(0);
  const [sections, setSections] = useState([]);
  const [saving, setSaving] = useState(false);
  const [idsection, setIdsection] = useState(null);

  const [secname, setSecname] = useState('');
  const [secdetail, setSecdetail] = useState('');
  const [secorder, setSecorder] = useState(0);
  const [save, setSave] = useState(false);
  //QUESTIONS
  const [cod_question, setCod_question] = useState(null);
  const [order, setOrder] = useState(1);

  //ACCESS
  const [postSurvey, setPostSurvey] = useState(false);

  useEffect(() => {
    Array.isArray(userloggedin.access) ? userloggedin.access.map((e) => {

      if(e.endpoint==='/projects/{project}/surveys' && e.method==='POST')
        setPostSurvey(true)

    }):<></>
  }, [userloggedin])

  useEffect(() => {
    store.dispatch(getSurvey(id))
  }, [match]);



  useEffect(() => {
    if(survey.survey){
      store.dispatch(getProject(survey.survey.cod_project))
      setSurveyName(survey.survey.name)
      setSections([])
      if(survey.survey.sections.length===0){
        setSecname(survey.survey.name)
        setSecdetail(survey.survey.detail)
        setSecorder(0)
      }else{
        survey.survey.sections.map((e)=>setSections(oldArray => [...oldArray, e]))
      }
      store.dispatch(getSurvey(null))
    }
  }, [survey]);

  useEffect(() => {
    if(secname!=='')
      setSave(true)
    if(secdetail!==''){
      setSave(true)
    }

  }, [secname,secdetail,secorder]);


  useEffect(() => {
    if(save) {
      const data={
        name:secname,
        detail:secdetail,
        order:secorder
      }
      if (idsection === null && secname !== '') {
        props.postSection(id, data)
      } else if (idsection !== null) {
        props.putSection(idsection, data)
      }
      setSaving(true)
    }
  }, [save]);


  useEffect(() => {
    setSave(false)
    if(postsection.section) {
      setIdsection(postsection.section.cod_section)
      setSecname('')
      setSecdetail('')
      setSecorder(0)
      setSaving(false)
      props.postSection(null, null)
      store.dispatch(getSurvey(id))
    }
    setSaving(false)
  }, [postsection]);

  useEffect(() => {
    setSave(false)
    if(putsection.section){
      setSecname('')
      setSecdetail('')
      setSecorder(0)
      setSaving(false)
      props.putSection(null, null)
      store.dispatch(getSurvey(id))
    }
    setSaving(false)
  }, [putsection]);

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof deletequestion.error!='undefined'){
      deletequestion.error===false?alertify.success("Se eliminó correctamente"):alertify.error("No se puede eliminar")
      props.deleteQuestion()
      store.dispatch(getSurvey(id))
    }
  }, [deletequestion])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof deletesection.error!='undefined'){
      setSections([])
      deletesection.error===false?alertify.success("Se eliminó correctamente"):alertify.error("No se puede eliminar")
      props.deleteSection()
      store.dispatch(getSurvey(id))
    }
  }, [deletesection])

  useEffect(() => {
    if(putquestion.question){
      props.putQuestion(null, null)
    }
    setSaving(false)
  }, [putquestion]);

  useEffect(() => {
    if(postquestion.question){
      props.postQuestion(null, null)
      store.dispatch(getSurvey(id))
    }
    setSaving(false)
  }, [postquestion]);

  const handleClickSection=(e)=>{
    setTop(scrooltop)
    setIdsection(e.currentTarget.id)
  }

  useEffect(() => {
    if(scrooltop<25)
      setTop(0)
    else
    setTop(scrooltop+window.innerHeight/2)
  }, [scrooltop]);


  const handleFocusSection=(e)=>{
    e.preventDefault()
    if(e.target.name==='name'){
      setSecname(e.target.value)
    }
    if(e.target.name==='detail'){
      setSecdetail(e.target.value)
    }
  }

  const handleClickAddSection=()=>{
    const data={
      "name":'Sin Título',
      "order":1
    }
    setSaving(true)
    props.postSection(id,data)
  }

  const handleClickQuestion=(question,order)=>{
    setCod_question(question)
    setOrder(order)
  }

  const handleClickDelQuestion=()=>{
    if(cod_question!==null)
      props.deleteQuestion(cod_question)
  }

  const handleClickDelSection=(id)=>{
    props.deleteSection(id)
  }

  const handleFocusQuestion=(e)=>{
    if(cod_question){
      let data={}
        if(e.target.name==='question'){
           data={
            "question":e.target.value,
          }
        }
        if(e.target.name==='required'){
           data={
            "required":e.target.checked,
          }
        }
        if(e.target.name==='type'){
           data={
            "type":e.target.value,
          }
        }
        setSaving(true)
        props.putQuestion(cod_question,data)
      }
    }

  const handleClickAddQuestion=()=>{
      let next=1
      let new_order=1;
      if(idsection!==null) {
        sections.map(e=>{
          if(e.cod_section==idsection){
            e.questions.map((q,i)=>{
              if(q.order==order){
                if(e.questions[i+1]){
                  next=e.questions[i+1].order
                  new_order=((order+next)/2)
                }else{
                  next=q.order+1
                  new_order=((order+next))
                }
                return
              }
            })
            return
          }
        })

        const data = {
          "order": new_order,
          "type": "short_answer",
        }
        setSaving(true)
        props.postQuestion(idsection, data)
      }
    }


  return <>
    {postSurvey?
    <div className="card">
      <div className={`card-header ${style.header}`}>
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
                  <span>Preguntas</span>
                </li>
              </ol>
            </nav>
          </div>
          <span style={{position: 'relative',fontSize: '10px',color: '#5f6368',fontStyle: 'italic'}}>{saving?'Guardando...':'Todos los cambios guardados'}</span>
        </div>
      </div>
      <div className="card-body py-3" style={{ background: '#F3F5F8'}}>
        <div  className={style.ct}>
          <div className={style.dt}>
            <div className={style.container}>
              {
                  sections.map((e,i)=>{
                    return <Section
                      id={e.cod_section}
                      onFocus={handleFocusSection}
                      key={i}
                      title={e.name}
                      detail={e.detail}
                      number={i+1}
                      tot_section={sections.length}
                      onClick={handleClickSection}
                      deleteSection={handleClickDelSection}
                    >
                      {
                        e.questions.map((e,i)=>{
                          return <Question
                            cod_survey={id}
                          stsave={setSaving}
                          key={i}
                          handleClick={handleClickDelQuestion}
                          onClick={handleClickQuestion}
                          onFocus={handleFocusQuestion}
                            {...e}
                          />
                        })
                      }
                    </Section>
                  })
              }
            </div>
            <div style={{top:top}} className={style.cbtns}>
              <div className={style.buttons}>
                <div onClick={handleClickAddQuestion} className={`${style.btn} ${style.tooltip}`}>
                  <span className={style.tooltiptext}>Añadir Pregunta</span>
                  <FaPlusCircle/>
                </div>
                <div onClick={handleClickAddSection}  className={`${style.btn} ${style.tooltip}`}>
                  <span className={style.tooltiptext}>Añadir Sección</span>
                  <FaListOl />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>:<></>}
  </>
}

const mapStateToProps = (state) => ({
  survey:state.SurveyState,
  postsection:state.PostSectionState,
  putsection:state.PutSectionState,
  deletesection:state.DeleteSectionState,
  //QUESTIONS
  deletequestion:state.DeleteQuestionState,
  putquestion:state.PutQuestionState,
  postquestion:state.PostQuestionState,
  userloggedin: state.userLoggedInState,
  //project
  project:state.ProjectState

})

const mapDispatchProps={
  postSection,putSection,deleteQuestion, putQuestion, postQuestion, deleteSection
}

export default connect(mapStateToProps, mapDispatchProps)(SurveyEdit)

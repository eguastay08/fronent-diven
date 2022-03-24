import {
  deleteQuestion, deleteSection,
  getProject,
  getSurvey,
  getSurveys, postQuestion,
  postSection,
  postSurvey, putQuestion,
  putSection
} from "../../../redux/actionCreators";
import {connect} from "react-redux";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import store from "../../../redux/store";
import style from "./styles.module.scss";
import {Button} from "react-bootstrap";
import Section from "./Section";
import {FaListOl, FaPlusCircle} from "react-icons/fa";
import {putSection as PutSectionState} from "../../../redux/reducers";
import Question from "./Question";
import logo from "../../../assets/img.png";
import alertify from "alertifyjs";

const SurveyEdit=(props)=>{
  const { id } = useParams()
  const{cod_survey,match,survey,postsection,putsection,deletequestion,deletesection,putquestion,postquestion,scrooltop,userloggedin}=props
  const [surveyname, setSurveyName] = useState('');
  const [top, setTop] = useState(0);
  const [sections, setSections] = useState([]);
  const [saving, setSaving] = useState('');
  const [idsection, setIdsection] = useState(null);

  const [secname, setSecname] = useState('');
  const [secdetail, setSecdetail] = useState('');
  const [secorder, setSecorder] = useState(0);
  const [save, setSave] = useState(false);
  //QUESTIONS
  const [cod_question, setCod_question] = useState(null);

  //ACCESS
  const [postSurvey, setPostSurvey] = useState(false);

  useEffect(() => {
    Array.isArray(userloggedin.access) ? userloggedin.access.map((e, index) => {

      if(e.endpoint==='/projects/{project}/surveys' && e.method==='POST')
        setPostSurvey(true)

    }):<></>
  }, [userloggedin])

  useEffect(() => {
    store.dispatch(getSurvey(id))
  }, [match]);


  useEffect(() => {
    if(survey.survey){
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
      setSaving('Guardando...')
    }
  }, [save]);


  useEffect(() => {
    setSave(false)
    if(postsection.section) {
      setIdsection(postsection.section.cod_section)
      setSecname('')
      setSecdetail('')
      setSecorder(0)
      setSaving('')
      props.postSection(null, null)
      store.dispatch(getSurvey(id))
    }
    setSaving('')
  }, [postsection]);

  useEffect(() => {
    setSave(false)
    if(putsection.section){
      setSecname('')
      setSecdetail('')
      setSecorder(0)
      setSaving('')
      props.putSection(null, null)
      store.dispatch(getSurvey(id))
    }
    setSaving('')
  }, [putsection]);

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof deletequestion.error!='undefined'){
      deletequestion.error===false?alertify.success("Se elimino correctamente"):alertify.error("No se puede eliminar")
      props.deleteQuestion()
      store.dispatch(getSurvey(id))
    }
  }, [deletequestion])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof deletesection.error!='undefined'){
      setSections([])
      deletesection.error===false?alertify.success("Se elimino correctamente"):alertify.error("No se puede eliminar")
      props.deleteSection()
      store.dispatch(getSurvey(id))
    }
  }, [deletesection])

  useEffect(() => {
    if(putquestion.question){
      props.putQuestion(null, null)
    }
    setSaving('')
  }, [putquestion]);

  useEffect(() => {
    if(postquestion.question){
      props.postQuestion(null, null)
      store.dispatch(getSurvey(id))
    }
    setSaving('')
  }, [postquestion]);

  const handleClickSection=(e)=>{
    setTop(scrooltop)
    setIdsection(e.currentTarget.id)
  }

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
    setSaving('Guardando...')
    props.postSection(id,data)
  }

  const handleClickQuestion=(e)=>{
    setCod_question(e.currentTarget.id)
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
        setSaving('Guardando...')
        props.putQuestion(cod_question,data)
      }
    }

    const handleClickAddQuestion=()=>{
      if(idsection!==null) {
        const data = {
          "order": 0,
          "type": "short_answer",
        }
        setSaving('Guardando...')
        props.postQuestion(idsection, data)
      }
    }

  return <>
    {postSurvey?
    <div className="card">
      <div className="card-header">
        <div className={style.row}>
          <h6 className="col-11 m-0 font-weight-bold text-primary">{surveyname}</h6>
          <span>{saving}</span>
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
  userloggedin: state.userLoggedInState

})

const mapDispatchProps={
  postSection,putSection,deleteQuestion, putQuestion, postQuestion, deleteSection
}

export default connect(mapStateToProps, mapDispatchProps)(SurveyEdit)

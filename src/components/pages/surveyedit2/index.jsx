import React, {useEffect, useState} from "react";
import {
  deleteQuestion,
  deleteSection, getSurvey,
  postQuestion,
  postSection,
  putQuestion,
  putSection
} from "../../../redux/actionCreators";
import {connect} from "react-redux";
import store from "../../../redux/store";
import {useParams} from "react-router-dom";
import style from "./styles.module.scss"

const SurveyEdit2=(props)=>{
  const { id } = useParams()
  const [saving, setSaving] = useState('');
  const {survey,userloggedin}= props
  const [surveyname, setSurveyName] = useState('');
  const [top, setTop] = useState(0);
  const [sections, setSections] = useState([]);
 const [idsection, setIdsection] = useState(null);

  const [secname, setSecname] = useState('');
  const [secdetail, setSecdetail] = useState('');
  const [secorder, setSecorder] = useState(0);
  const [save, setSave] = useState(false);

  //ACCESS
  const [postSurvey, setPostSurvey] = useState(false);

  useEffect(() => {
    Array.isArray(userloggedin.access) ? userloggedin.access.map((e, index) => {

      if(e.endpoint==='/projects/{project}/surveys' && e.method==='POST')
        setPostSurvey(true)

    }):<></>
  }, [userloggedin])

  useEffect( () =>
    store.dispatch(getSurvey(id))
    ,[]);

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
  //useEffect( () => console.log("data1 update"), [ data1 ] );
  useEffect( () => console.log("any update") );
  //useEffect( () => () => console.log("data1 update or unmount"), [ data1 ] );
  useEffect( () => () => console.log("unmount"), [] );

  return postSurvey ?
      <>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>{JSON.stringify(survey)}</div>
      </>
      : null
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

export default connect(mapStateToProps, mapDispatchProps)(SurveyEdit2)

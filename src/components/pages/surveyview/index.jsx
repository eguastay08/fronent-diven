import style from "../surveyedit/styles.module.scss";
import {Link, useParams} from "react-router-dom";
import logo from "../../../assets/img.png";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import store from "../../../redux/store";
import {getSurvey} from "../../../redux/actionCreators";
import SectionView from "./SectionView";
import Question from "../surveyedit/Question";
import QuestionView from "./QuestionView";

const SurveyView=(props)=>{
  const { id } = useParams()
  const{match,survey}=props
  const [surveyname, setSurveyName] = useState('');
  const [sections, setSections] = useState([]);
  const [secname, setSecname] = useState('');

  useEffect(() => {
    setSections([])
    if(survey.survey){
      setSurveyName(survey.survey.name)
      if(survey.survey.sections.length===0){
        setSecname(survey.survey.name)
      }else{
        survey.survey.sections.map((e)=>setSections(oldArray => [...oldArray, e]))
      }
    }
  }, [survey]);

  useEffect(() => {
    store.dispatch(getSurvey(id))
  }, [match]);


  return<>
    <div className="card">
      <div className="card-header">
        <div className={style.row}>
          <h6 className="col-11 m-0 font-weight-bold text-primary"> Vista Previa {surveyname}</h6>
        </div>
      </div>
      <div className="card-body py-3" style={{ background: '#F3F5F8'}}>
        <div  className={style.ct}>
          <div className={style.dt}>
            <div className={style.container}>
              {
                sections.map((e,i)=>{
                  return <SectionView
                    key={i}
                    title={e.name}
                    detail={e.detail}
                    number={i+1}
                    tot_section={sections.length}
                  >
                    <section className={style.question}>
                      <div className={`${style.content} row`} >
                        {
                          e.questions.map((e,i)=>{
                            return <QuestionView
                              id={i+1}
                              key={i}
                              {...e}
                            />
                          })
                        }
                      </div>
                    </section>
                  </SectionView>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

const mapStateToProps = (state) => ({
  survey: state.SurveyState,
})

export default connect(mapStateToProps, {})(SurveyView)


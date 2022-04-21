import style from "../surveyedit/styles.module.scss";
import Input from "../../molecules/input/Input";
import React, {useEffect, useState} from "react";
import Textarea from "../../molecules/textarea/textarea";
import Select from "../../molecules/Select";

const QuestionView=(props)=>{
  const {question,cod_question,type,id} =props
  const [options, setOptions] = useState(props.options);
  const [opc, setOpc] = useState([]);

  useEffect(() => {
    setOpc([])
    options.map((e, i) => {
      const data = {
        label: e.option,
        value: e.cod_option
      }
      setOpc(oldArray => [...oldArray,data ])
    })
  }, [options]);


  return<div className={style.cques} style={{borderBottom: '1px solid #dadce0'}}>
        <div  className={style.cinpts} >
          <div style={{width:'100%'}} className={style.cinput}>
            {
              type==='short_answer'?
                <Input
                  name={cod_question}
                  id={cod_question}
                  type="text"
                  label={`${id}. ${question}`}
                  autoComplete="off"
                />
                :type==='numerical'?
                  <Input
                    name={cod_question}
                    id={cod_question}
                    type="number"
                    label={`${id}. ${question}`}
                    autoComplete="off"
                  />
                  :type==='long_text'?
                    <Textarea
                      name={cod_question}
                      id={cod_question}
                      label={`${id}. ${question}`}
                      autoComplete="off"
                    />
                    :type==='date'?
                      <Input
                        name={cod_question}
                        id={cod_question}
                        type="date"
                        label={`${id}. ${question}`}
                        autoComplete="off"
                      />
                      :type==='time'?
                        <Input
                          name={cod_question}
                          id={cod_question}
                          type="time"
                          label={`${id}. ${question}`}
                          autoComplete="off"
                        />:type==='datetime'?
                          <Input
                            name={cod_question}
                            id={cod_question}
                            type="datetime-local"
                            label={`${id}. ${question}`}
                            autoComplete="off"
                          />
                        :type==='multiple_choice'?
                        <div>
                          <div style={{fontWeight:'bold', marginBottom:10}}>{`${id}. ${question}`}</div>
                          {
                            options.map((e,i)=>{
                              return  <div key={i}>
                                <input style={{marginRight:10}} type="radio" id={e.cod_option} name={e.cod_question} value={e.cod_option}/>
                                <label htmlFor={e.cod_option}>{e.option}</label>
                              </div>
                            })
                          }
                        </div>
                          :type==='checkboxes'?
                            <div>
                                <div style={{fontWeight:'bold', marginBottom:10}}>{`${id}. ${question}`}</div>
                              {
                                options.map((e,i)=>{
                                  return  <div key={i}>
                                    <input style={{marginRight:10}}  type="checkbox" id={e.cod_option} name={e.cod_question} value={e.cod_option}/>
                                    <label htmlFor={e.cod_option}>{e.option}</label>
                                  </div>
                                })
                              }
                            </div>
                            :type==='dropdown'?
                                <Select
                                  name={cod_question}
                                  id={cod_question}
                                  label={`${id}. ${question}`}
                                  autoComplete="off"
                                  options={opc}
                                />
                              :<></>
            }
          </div>
        </div>
      </div>
}

export default QuestionView

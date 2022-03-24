import style from "./styles.module.scss";
import Input from "../../molecules/input/Input";
import Select from "../../molecules/Select";
import React, {useEffect, useState} from "react";
import {FaCheckCircle, FaCircle, FaPlusCircle, FaRegTrashAlt, FaTrashAlt} from "react-icons/fa";
import alertify from "alertifyjs";
import {connect} from "react-redux";
import {deleteOption, deleteQuestion, getUsers, postOption, putOption} from "../../../redux/actionCreators";
import store from "../../../redux/store";
import {ImCheckboxUnchecked, ImRadioUnchecked} from "react-icons/im";
import Options from "./Options";
import GroupOptions from "./GroupOptions";



const Question=(props)=>{
  const {putoption,stsave,postoption,deleteoption}=props
  const [type_question, setType_question] = useState(props.type);
  const [options, setOptions] = useState(props.options);
  const [question, setQuestion] = useState(props.question);
  const [required, setRequired] = useState(props.required);
  const [cod_question, setCod_question] = useState(props.cod_question);
  const [cod_option, setCod_option] = useState('');
  const [val, setVal] = useState('');
  const [disabled, setDisabled] = useState(false);

  const type_questions=[
    {
      label: "Respuesta Corta",
      value: "short_answer",
    },
    {
      label: "Párrafo",
      value: "long_text"
    },
    {
      label: "Opción Multiple",
      value: "multiple_choice"
    },
    {
      label: "Selección Multiple",
      value: "checkboxes"
    },
    {
      label: "Desplegable",
      value: "dropdown"
    },
    {
      label: "Fecha",
      value: "date"
    },
    {
      label: "Hora",
      value: "time"
    },
    {
      label: "Número",
      value: "numerical"
    }
  ]
  useEffect(() => {
    console.log(options)
  }, [options]);

  useEffect(() => {
    if(putoption.option){
      props.putOption(null, null)
    }
    stsave('')
  }, [putoption]);

  useEffect(() => {
    if(deleteoption.option){
      props.deleteOption(null)
    }
    stsave('')
  }, [deleteoption]);

  useEffect(() => {
    if(postoption.option){
      setCod_option(postoption.option.cod_option)
      let option={
        cod_option:postoption.option.cod_option,
        option:postoption.option.option
      }
      setOptions(oldArray => [...oldArray, option]);
      props.postOption(null, null)
    }
    stsave('')
    setDisabled(false)
  }, [postoption]);

  const randomCoding=()=>{
    const arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var idvalue ='';
    const n = 1;
    for(var i=0;i<n;i++){
      idvalue+=arr[Math.floor(Math.random()*26)];
    }
    return idvalue;
  }

  const handleClickNewOption=(e)=>{
    setDisabled(true)
    if(e.target.id==0){
      const data={
        "option":"option "+randomCoding()
      }
      props.postOption(cod_question,data)
    }
  }

  const handleBlurOption=(e)=>{
    if(e.target.value!==''){
      if(e.target.id===''){
        const data={
          "option":e.target.value
        }
        props.postOption(cod_question,data)
      }else{
        const data={
          "option":e.target.value
        }
        props.putOption(e.target.id,data)
      }
      stsave('Guardando...')
    }
  }

  const handleClickDel=(e)=>{
    stsave('Guardando...')
    const newoptions = options.filter((op)=> {
      if(op.cod_option!=e.currentTarget.title)
        return op
    });
    setOptions(newoptions);
    props.deleteOption(e.currentTarget.title)
  }


  return<section onClick={props.onClick} id={cod_question} className={style.question}>
    <div className={style.content}>
      <div className={style.cques}>
        <div className={style.cinpts} >
          <div className={style.cinput}>
            <Input
              name="question"
              id="question"
              type="text"
              label="Pregunta"
              autoComplete="off"
              defaultValue={question}
              onBlur={props.onFocus}
            />
          </div>
          <div className={style.select}>
            <Select
              opnull={true}
              defaultValue={type_question}
              options={type_questions}
              id="type_question"
              name="type"
              handleChange={(e)=>setType_question(e.target.value)}
              onBlur={props.onFocus}
            />
          </div>
        </div>
        <div className={style.options}>
          {
            type_question==='short_answer'?
            <div className={style.short}>
              <Input
                id="short_answer"
                type="text"
                label="Respuesta Corta"
                autoComplete="off"
                disabled={true}
              />
            </div>:
              type_question==='long_text'?
                <div className={style.long}>
                  <Input
                    id="long_text"
                    type="text"
                    label="Respuesta"
                    autoComplete="off"
                    disabled={true}
                  />
                </div>:
                type_question==='multiple_choice'?
                  <div className={style.multiplechoice}>
                    {
                      options.map((e,i)=>{
                       return <Options
                          type={type_question}
                          handleBlur={handleBlurOption}
                          cod_option={cod_option}
                          handleClickDel={handleClickDel}
                          key={i}
                          {...e}
                        />
                      })
                    }
                    <div className={style.coptions}>
                      <ImRadioUnchecked/> <textarea disabled={disabled} onClick={handleClickNewOption} onChange={()=>setVal('')} value={val} name="option" placeholder="Añadir Opción" className={style.txtarea}></textarea>
                    </div>
                  </div>:
                  type_question==='checkboxes'?
                    <div className={style.multiplechoice}>
                           <GroupOptions
                             cod_question={cod_question}
                            options={options}
                            type={type_question}
                            handleBlur={handleBlurOption}
                            handleClickDel={handleClickDel}
                            cod_option={cod_option}
                            type_question={type_question}
                            setOptions={setOptions}
                            handleClickNewOption={handleClickNewOption}
                          />
                    </div>:
                    type_question==='dropdown'?
                      <div className={style.multiplechoice}>
                        {
                          options.map((e,i)=>{
                            return <Options
                              num={i+1}
                              type={type_question}
                              handleBlur={handleBlurOption}
                              handleClickDel={handleClickDel}
                              cod_option={cod_option}
                              key={i}
                              {...e}
                            />
                          })
                        }
                        <div className={style.coptions}>
                           <textarea disabled={disabled} onClick={handleClickNewOption} name="option" placeholder="Añadir Opción" className={style.txtarea}></textarea>
                        </div>
                      </div>:
                      type_question==='date'?
                        <div className={style.short}>
                          <Input
                            id="date"
                            type="date"
                            label="Fecha"
                            autoComplete="off"
                            disabled={true}
                          />
                        </div>:
                        type_question==='time'?
                          <div className={style.short}>
                            <Input
                              id="time"
                              type="time"
                              label="Hora"
                              autoComplete="off"
                              disabled={true}
                            />
                          </div>:
                          type_question==='datetime'?
                            <div className={style.short}>
                              <Input
                                id="datetime"
                                type="datetime-local"
                                label="Fecha-Hora"
                                autoComplete="off"
                                disabled={true}
                              />
                            </div>:
                            type_question==='numerical'?
                              <div className={style.short}>
                                <Input
                                  id="numerical"
                                  type="numeric"
                                  label="Número"
                                  autoComplete="off"
                                  disabled={true}
                                />
                              </div>:
                <></>
          }
        </div>
        <div className={style.footer}>
          <div className={style.foptions}>
            <div className="form-check form-switch">
              <input onChange={props.onFocus} defaultChecked={required} id="required" className="form-check-input" type="checkbox" role="switch" name="required"/>
              <label className="form-check-label" htmlFor="required">Requerido</label>
            </div>
            <div onClick={props.handleClick} className={`${style.btn} ${style.tooltip}`}>
              <span className={style.tooltiptext}>Eliminar</span>
              <FaTrashAlt/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

const mapStateToProps = (state) => ({
  putoption:state.PutOptionState,
  postoption:state.PostOptionState,
  deleteoption:state.DeleteOptionState
})

const mapDispatchProps={
  putOption,postOption, deleteOption
}

export default connect(mapStateToProps, mapDispatchProps)(Question)

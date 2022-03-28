import Option from "./Option";
import React, {useEffect, useState} from "react";
import style from "./styles.module.scss";
import {connect} from "react-redux";
import {deleteOption, getSurvey, postOption, putOption} from "../../../redux/actionCreators";


const Options=(props)=> {
  const {type_question,stsave,putoption,deleteoption,postoption,cod_question} =props
  const [options, setOptions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [cod_option, setCod_option] = useState('');


  useEffect(() => {
   setOptions(props.options)
  }, [cod_question]);


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

  const add=(question,option)=>{
   if(question==cod_question){
     setOptions(oldArray => [...oldArray, option]);
   }

  }

  useEffect(() => {
    if(postoption?.option){
      setCod_option(postoption.option.cod_option)
      let option={
        cod_option:postoption.option.cod_option,
        option:postoption.option.option
      }
        add(postoption.option.cod_question,option)
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

  const handleClickNewOption = (e) => {
    setDisabled(true)
    if (e.target.id == 0) {
      const data = {
        "option": "option " + randomCoding()
      }
      props.postOption(cod_question, data)
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

  const handleBlurOption=(e)=>{
    if(e.target.value!=''){
      if(e.target.id==''){
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



  return<> {options.map((e,i)=>{
    return <Option
      num={i+1}
      type={type_question}
      handleBlur={handleBlurOption}
      handleClickDel={handleClickDel}
      cod_option={cod_option}
      key={i}
      {...e}
    />
  })}
    <div className={style.coptions}>
      <textarea disabled={disabled} onFocus={handleClickNewOption} placeholder="Añadir Opción" className={style.txtarea}/>
    </div>
  </>
}

const mapStateToProps = (state) => ({
  putoption:state.PutOptionState,
  postoption:state.PostOptionState,
  deleteoption:state.DeleteOptionState
})

const mapDispatchProps={
  putOption,postOption, deleteOption,getSurvey
}

export default connect(mapStateToProps, mapDispatchProps)(Options)

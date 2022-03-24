import {useEffect, useState} from "react";
import Question from "./Question";

const Questions=(props)=>{
  const {stsave,handleClick,onClick,onFocus,}=props
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions([])
    console.log('update questions')
    setQuestions(props.questions)
  }, [props.questions]);

  //UMOUNT
  useEffect(
    () =>
      () => {
      console.log("desmonto")
        setQuestions([])
      }
    , [] );

  return Array.isArray(questions)?questions?.map((e,i)=>{
      return <Question
            stsave={stsave}
            key={i}
            handleClick={handleClick}
            onClick={onClick}
            onFocus={onFocus}
            {...e}
          />
  }):null
}

export default Questions

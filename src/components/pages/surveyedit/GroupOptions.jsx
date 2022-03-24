import Options from "./Options";
import style from "./styles.module.scss";
import {ImCheckboxUnchecked} from "react-icons/im";
import {useEffect, useState} from "react";




const GroupOptions=(props)=>{
  const {cod_question,type_question,handleBlurOption,handleClickDel,cod_option,handleClickNewOption} = props
  const [options, setOptions] = useState(props.options);

  useEffect(() => {
    console.log(options)
  }, [options]);


  return  <div>
    {
      options.map((e, i) => {
        return <Options
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
      <ImCheckboxUnchecked/> <textarea onClick={(e)=>handleClickNewOption(e)} name="option" placeholder="Añadir Opción" className={style.txtarea}></textarea>
    </div>
  </div>
}

export default GroupOptions

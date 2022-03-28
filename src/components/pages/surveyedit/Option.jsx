import style from "./styles.module.scss";
import {ImCheckboxUnchecked, ImRadioUnchecked} from "react-icons/im";
import {FaTrashAlt} from "react-icons/fa";
import {useEffect, useState} from "react";

const Option=(props)=>{
  const {type,cod_option,handleBlur,option}=props
  const [val, setVal] = useState(option);
  useEffect(() => {
    setVal(option)
  }, [option]);

  return<div  className={style.coptions}>
    {type==='multiple_choice'?<ImRadioUnchecked/>:type==='checkboxes'?<ImCheckboxUnchecked/>:`${props.num}.`}
    <textarea onFocus={e=>e.target.select()} value={val} onChange={(e)=>setVal(e.target.value)} id={cod_option} onBlur={handleBlur} name="option" placeholder="Añadir Opción" className={style.txtarea} />
    <div  title={cod_option} onClick={props.handleClickDel} className={`${style.btn} ${style.tooltip}`}>
      <FaTrashAlt/>
    </div>
  </div >
}

export default Option

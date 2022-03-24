import style from "./styles.module.scss";
import {ImCheckboxUnchecked, ImRadioUnchecked} from "react-icons/im";
import {FaTrashAlt} from "react-icons/fa";

const Option=(props)=>{
  const {type,cod_option,handleBlur,option}=props
  return<div  className={style.coptions}>
    {type==='multiple_choice'?<ImRadioUnchecked/>:type==='checkboxes'?<ImCheckboxUnchecked/>:`${props.num}.`}
    <textarea id={cod_option} onBlur={handleBlur} name="option" placeholder="Añadir Opción" className={style.txtarea} defaultValue={option} />
    <div  title={cod_option} onClick={props.handleClickDel} className={`${style.btn} ${style.tooltip}`}>
      <FaTrashAlt/>
    </div>
  </div >
}

export default Option

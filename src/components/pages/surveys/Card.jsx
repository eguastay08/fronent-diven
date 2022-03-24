import style from './styles.module.scss'
import {FaEllipsisV} from "react-icons/fa";

const Card=(props)=>{
  const {name,date_init,date_finally,status,detail,max_answers,tot,onClick,onContextMenu,cod_survey,onChange,putSurvey} =props
  let dt = new Date(date_init)
  const di=dt.toLocaleString()
   dt = new Date(date_finally)
  const df=dt.toLocaleString()

  return<div id={cod_survey} onContextMenu={(e)=>onContextMenu(e,cod_survey,name)} className={style.card}>
    <div className={style.title}>
      <span>
        {name}
      </span>
      <div className={style.btns}>
        {putSurvey?<div  className="form-check form-switch">
          <input disabled={status} defaultChecked={status} name={cod_survey} onChange={onChange} id="status" className="form-check-input" type="checkbox" role="switch"/>
        </div>:<></>}
        <div onClick={(e)=>onContextMenu(e,cod_survey,name)} className={style.btnbonextmenu}>
          <FaEllipsisV/>
        </div>
      </div>
    </div>
    <div className={style.body} onClick={onClick}>
      <div className={style.text}>
        <div>
          <b>Fecha Inicio:</b> {di}
        </div>
        <div>
          <b>Fecha Fin:</b> {df}
        </div>
        <div>
          <b>Estado:</b> {status?'Producción':'Diseño'}
        </div>
        <div>
          <b>Respuestas:</b> {tot} de {max_answers}
        </div>
        <div>
          <b>Detalle:</b> {detail}
        </div>
      </div>
    </div>
  </div>
}

export default Card

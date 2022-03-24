import style from './styles.module.scss'
import {FaEllipsisV} from "react-icons/fa";

const Card=(props)=>{
  const {name, resolution,image,cod_project,detail,dpa,onContextMenu,onClick} =props
  return<div onContextMenu={(e)=>onContextMenu(e,cod_project)} className={style.card} id={cod_project}>
    <div className={style.title}>
      <span>
        {name}
      </span>
      <div onClick={(e)=>onContextMenu(e,cod_project)}  className={style.btnbonextmenu}>
       <FaEllipsisV/>
      </div>
    </div>
    <div onClick={onClick}  className={style.body}>
      <div className={style.text}>
        <div>
          <b>Resolución:</b> {resolution}
        </div>
        <div>
          <b>Detalle:</b> {detail}
        </div>
        <div>
          <b>Ubicación:</b> {dpa}
        </div>
      </div>
    </div>
  </div>
}

export default Card

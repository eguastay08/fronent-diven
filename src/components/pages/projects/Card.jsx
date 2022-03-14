import style from './styles.module.scss'


const Card=(props)=>{
  const {name, resolution,image,cod_project,detail,dpa,onContextMenu,onClick} =props
  return<div onClick={onClick} onContextMenu={onContextMenu} className={style.card} id={cod_project}>
    <div className={style.title}>
      <span>
        {name}
      </span>
      <div onClick={onContextMenu}  className={style.btnbonextmenu}>
        <span className={style.span}>
          <div className={style.mvp}>
            <div>...</div>
          </div>
        </span>
      </div>
    </div>
    <div className={style.body}>
      <div className={style.img}>
        <img src="https://www.gravatar.com/avatar/618fe1a3e7a342df99aea1e492bcbd7f"/>
      </div>
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

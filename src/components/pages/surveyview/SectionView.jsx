import style from "../surveyedit/styles.module.scss";

const SectionView=(props)=>{
  const {title,detail,number,tot_section,children}=props

  return <section className={style.section}>
    <div className={style.scn} >
      <span>Sección { number } de {tot_section}</span>
    </div>
    <div className={style.content}>
      <div className={style.cf}>
        <div className={style.barh}></div>
        <div className={style.cont}>
          <div className={style.cinput}>
            <span  className={style.title}>{title}</span>
          </div>
          <div className={style.cinput}>
            <span  className={style.detail}>{detail}</span>
          </div>
        </div>
      </div>
    </div>
    {children}
  </section>
}

export default SectionView

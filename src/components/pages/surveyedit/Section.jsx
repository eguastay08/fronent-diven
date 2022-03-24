import style from "./styles.module.scss";
import {FaTrashAlt} from "react-icons/fa";
import React, {useState} from "react";

const Section=(props)=>{
  const {title,detail,number,tot_section,id,children}=props

  return<section id={id} className={style.section} onClick={props.onClick}>
      <div className={style.scn} >
        <span>Sección { number } de {tot_section}</span>
      </div>
    <div className={style.content}>
      <div className={style.cf}>
        <div className={style.barh}></div>
        <div className={style.cont}>
            <div className={style.cinput}>
              <textarea name="name" onBlur={props.onFocus} placeholder="Titulo" className={style.title} defaultValue={title}/>
              <div>
                <div onClick={()=>props.deleteSection(id)} className={`${style.btn} ${style.tooltip}`}>
                  <span className={style.tooltiptext}>Eliminar</span>
                  <FaTrashAlt/>
                </div>
              </div>
            </div>
            <div className={style.cinput}>
              <textarea name="detail" onBlur={props.onFocus} placeholder="Descripción" className={style.detail} defaultValue={detail}/>
            </div>
        </div>
      </div>
    </div>
    {children}
  </section>
}
export default Section

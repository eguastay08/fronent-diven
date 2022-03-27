import style from "../projects/styles.module.scss";
import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import Card from "./Card";
import {connect} from "react-redux";
import store from "../../../redux/store";
import {
   deleteSurvey,
   duplicateSurvey,
   getProject,
   getResponses,
   getSurvey,
   getSurveys,
   postSurvey,
   putSurvey
} from "../../../redux/actionCreators";

import {Link, useParams} from "react-router-dom";
import Input from "../../molecules/input/Input";
import alertify from "alertifyjs";

const Surveys=(props)=>{
  const { id } = useParams()
  const {project,match, surveys,postsurvey,deletesurvey,survey,putsurvey,userloggedin,responses,duplicate}= props
  const [show, setShow] = useState(false);
  const [nameproject, setNameProject] = useState();
  const [btnSubmit, setBtnSubmit] = useState(false);
  const [name, setName] = useState('');
  const [date_init, setDate_init] = useState('');
  const [date_finally, setDate_finally] = useState('');
  const [max_answers, setMax_answers] = useState(-1);
  const [detail, setDetail] = useState('');
  const [idsurvey, setIdsurvey] = useState(0);
  const [surveyName, setSurveyName] = useState('');
  //contextmenu
  const [showContextMenu, setShowContextMenu] = useState('none');
  const [topContextMenu, setTopContextMenu] = useState(0);
  const [leftContextMenu, setLeftContextMenu] = useState(0);
  const [codsurvey, setCodSurvey] = useState(null);
  const [update, setUpdate] = useState(false);

  //ACCESS
  const [postSurvey, setPostSurvey] = useState(false);
  const [putSurvey, setPutSurvey] = useState(false);
  const [deleteSurvey, setDeleteSurvey] = useState(false);

  useEffect(() => {
    Array.isArray(userloggedin.access) ? userloggedin.access.map((e) => {

      if(e.endpoint==='/projects/{project}/surveys' && e.method==='POST')
        setPostSurvey(true)

      if(e.endpoint==='/surveys' && e.method==='PUT')
        setPutSurvey(true)

      if(e.endpoint==='/surveys' && e.method==='DELETE')
        setDeleteSurvey(true)

    }):<></>
  }, [userloggedin])


  useEffect(() => {
    store.dispatch(getProject(id))
    store.dispatch(getSurveys(id))
  }, [match]);

  useEffect(() => {
    if(project.project)
      setNameProject(project.project.name)
  }, [project]);

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof postsurvey.error!='undefined'){
      postsurvey.error===false?alertify.success("Se agrego correctamente"):alertify.error("Ocurrio un error al intentar agregar")
      setBtnSubmit(false)
      setShow(false)
      store.dispatch(getSurveys(id))
      props.postSurvey(null,null)
    }
  }, [postsurvey])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof duplicate.error!='undefined'){
      duplicate.error===false?alertify.success("Se duplico correctamente"):alertify.error("Ocurrio un error, intente nuevamente")
      store.dispatch(getSurveys(id))
      props.duplicateSurvey(null)
    }
  }, [duplicate])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof putsurvey.error!='undefined'){
      putsurvey.error===false?alertify.success("Se actualizo correctamente"):alertify.error("Ocurrio un error al intentar actualizar")
      setBtnSubmit(false)
      setShow(false)
      store.dispatch(getSurveys(id))
      props.putSurvey(null,null)
      setUpdate(false)
    }
  }, [putsurvey])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof deletesurvey.error!='undefined'){
      deletesurvey.error===false?alertify.success("Se elimino correctamente"):alertify.error("Ocurrio un error al intentar eliminar")
      store.dispatch(getSurveys(id))
      props.deleteSurvey(null)
    }
  }, [deletesurvey])

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    setUpdate(false)
    setName('')
    setDate_init('')
    setDate_finally('')
    setMax_answers('-1')
    setDetail('')
  }

  const formatDateTime=(datetime)=>{
    if(datetime!=='') {
      const dt = new Date(datetime)
      return dt.toISOString()
   }
    return ''
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const data={
      name:name,
      date_init:formatDateTime(date_init),
      date_finally:formatDateTime(date_finally),
      max_answers:max_answers,
      detail:detail
    }

    if(update){
      props.putSurvey(idsurvey,data)
    }else {
      props.postSurvey(id,data)
    }

  }

  const handleContextMenu=(e,id,name)=>{
    e.preventDefault()
    setLeftContextMenu(e.pageX)
    if((window.innerHeight-e.pageY)<250){
      setTopContextMenu(e.pageY-250)
    }else{
      setTopContextMenu(e.pageY)
    }
    setShowContextMenu('block')
    setCodSurvey(id)
    setSurveyName(name)
  }

  const formatDateTimeToInput=(date)=>{
    const dt=new Date(date)
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset())
    return dt.toISOString().slice(0,16);
  }

  useEffect(() => {
    if(survey.survey&&update){
      setName(survey.survey.name)
      setDate_init(formatDateTimeToInput(survey.survey.date_init))
      setDate_finally(formatDateTimeToInput(survey.survey.date_finally))
      setMax_answers(survey.survey.max_answers)
      setDetail(survey.survey.detail)
      setIdsurvey(survey.survey.cod_survey)
      setShow(true)
    }
  }, [survey]);

  const handleClick=()=> {
    setShowContextMenu('none')
  }

  const handleClickDel=()=>{
    setShowContextMenu('none')
    alertify.confirm('Eliminar Encuesta', `¿Seguro de eliminar?`,()=> {props.deleteSurvey(codsurvey) }
      , function () {
      });
  }

  const handleClickMod=()=>{
    props.getSurvey(codsurvey)
    setShowContextMenu('none')
    setUpdate(true)
  }

  const handleChangeStatus=(e)=>{
    if(e.target.checked) {
      const data={
          "status":true
      }
      alertify.confirm('Enviar Encuesta a Producción', `Esta acción es Irreversible ¿Está Seguro?`,()=> {
          props.putSurvey(e.target.name,data)
        }
        , () =>{
          e.target.checked=false
        });
    }
  }

  const handleDownload=()=>{
    props.getResponses(codsurvey)
  }

  const handleDuplicate=()=>{
    props.duplicateSurvey(codsurvey)
    setShowContextMenu('none')
  }

  useEffect(() => {
    setShowContextMenu(false)
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof responses.error !='undefined'){
      if(!responses.error){
        const data=responses.response
        if(data.length===0){
          props.getResponses(null)
          alertify.success("No se encontrarón respuestas")
        }else{
          try{
            const replacer = (key, value) => value === null ? '' : value
            const header = Object.keys(data[0])
            const csv = [
              header.join(','),
              ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
            ].join('\r\n')
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob)
            alertify.success("El archivo se generó con éxito,<br> su descarga comenzará en unos segundos.")
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = surveyName+".csv";
            a.click();
            window.URL.revokeObjectURL(url);
            props.getResponses(null)
          }catch (e){
            props.getResponses(null)
            alertify.error("Ocurrio un error al intentar descargar")
          }
        }
      }else{
        props.getResponses(null)
        alertify.error("Ocurrio un error al intentar descargar")
      }
    }
  }, [responses]);


  return <>
    <div className="card">
      <div className="card-header">
        <div className={style.row}>
          <h6 className="col-11 m-0 font-weight-bold text-primary">Encuestas proyecto {nameproject}</h6>
          {postSurvey?<Button className="btn btn-primary" variant="primary" onClick={handleShow}>
            Nuevo
          </Button>:<></>}
        </div>
      </div>
      <div className="card-body py-3">
        <div className={style.container}>
          <div className={style.grid}>
            {
              Array.isArray(surveys.surveys)?surveys.surveys.map((e, index) => {
               return <Card key={index}
                            putSurvey={putSurvey}
                            onContextMenu={handleContextMenu}
                            onChange={handleChangeStatus}
                            onClick={handleClick}
                  {...e}
                />
              }):<></>
            }
          </div>
        </div>
      </div>
    </div>
    <div className={style.menu} style={{display:showContextMenu,top:`${topContextMenu}px`,left:`${leftContextMenu}px`}} >
      <ul className={style.options}>
        {postSurvey?<li className={style.option}><Link to={`/surveys/${codsurvey}/edit`}>Preguntas</Link></li>:<></>}
        <li className={style.option}><Link to={`/surveys/${codsurvey}/view`}>Vista Previa</Link></li>
        {putSurvey?<li className={style.option} ><a onClick={handleClickMod}> Modificar</a></li>:<></>}
        {deleteSurvey?<li className={style.option} ><a onClick={handleClickDel}>Eliminar</a></li>:<></>}
        {postSurvey?<li className={style.option}><a onClick={handleDuplicate}>Duplicar</a></li>:<></>}
        {postSurvey?<li className={style.option} ><a onClick={handleDownload}>Descargar Respuestas</a></li>:<></>}
      </ul>
    </div>
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{update?'Actualizar':'Nueva Encuesta'}</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit.bind()}>
        <Modal.Body>
          <Input
            id="name"
            name="name"
            type="text"
            label="Nombre"
            required
            autoFocus
            onChange={(e)=>setName(e.target.value)}
            defaultValue={name}
          />
          <Input
            id="date_init"
            name="date_init"
            type="datetime-local"
            label="Fecha Inicio"
            required
            onChange={(e)=>setDate_init(e.target.value)}
            defaultValue={date_init}
          />
          <Input
            id="date_finally"
            name="date_finally"
            type="datetime-local"
            label="Fecha Fin"
            onChange={(e)=>setDate_finally(e.target.value)}
            defaultValue={date_finally}
          />
          <Input
            id="max_answers"
            name="max_answers"
            type="number"
            label="Número de Respuestas"
            onChange={(e)=>setMax_answers(e.target.value)}
            defaultValue={max_answers}
          />
          <Input
            id="detail"
            name="detail"
            type="text"
            label="Detalle"
            onChange={(e)=>setDetail(e.target.value)}
            defaultValue={detail}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">{btnSubmit ? 'Guardando...' : 'Guardar'}</Button>
        </Modal.Footer>
      </form>
    </Modal>
  </>
}
const mapStateToProps = (state) => ({
  project:state.ProjectState,
  surveys:state.SurveysState,
  postsurvey:state.PostSurveyState,
  putsurvey:state.PutSurveyState,
  deletesurvey:state.DeleteSurveyState,
  survey:state.SurveyState,
  userloggedin: state.userLoggedInState,
  responses:state.ResponseState,
  duplicate:state.DuplicateSurveyState
})

const mapDispatchProps={
  postSurvey, deleteSurvey, getSurvey, putSurvey, getResponses, duplicateSurvey
}

export default connect(mapStateToProps, mapDispatchProps)(Surveys)

import style from "./styles.module.scss";
import stylesGeneral from '../../../styles/styles.module.scss'
import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import Card from "./Card";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {connect} from "react-redux";
import store from "../../../redux/store";
import {
  deleteProject,
  getDpa, getProject,
  getProjects,
  getProvinces,
  getRoles,
  getUsers,
  postProject,
  putProject
} from "../../../redux/actionCreators";
import Input from "../../molecules/input/Input";
import Select from "../../molecules/Select";
import alertify from "alertifyjs";
import {Link, Navigate, useParams} from "react-router-dom";
import {putProject as PutProjectState} from "../../../redux/reducers";
import Textarea from "../../molecules/textarea/textarea";
//import ContextMenu  from '../../molecules/ContextMenu/ContextMenu'
//import MenuItem  from '../../molecules/ContextMenu/MenuItem'

const Projects=(props)=>{

  const {projects,match, provinces,dpa,postproject,putproject, project,deleteproject,userloggedin}=props
  const [show, setShow] = useState(false);
  const [btnSubmit, setBtnSubmit] = useState(false);
  const [btnSubmitValue, setBtnSubmitValue] = useState('post');
  const [dataprovinces, setDataProvinces] = useState([]);
  const [datacanton, setDataCanton] = useState([]);
  const [dataparish, setDataParish] = useState([]);
  const [name, setName] = useState();
  const [resolution, setResolution] = useState();
  const [detail, setDetail] = useState();
  const [cod_dpa, setCodDpa] = useState();
  //access
  const [postProject, setPostProject] = useState(false);
  const [putProject, setPutProject] = useState(false);
  const [deleteProject, setDeleteProject] = useState(false);
  const [postProjectMembers, setPostProjectMembers] = useState(false);
  const [deleteProjectMembers, setDeleteProjectMembers] = useState(false);
  const [getSurveysProject, setGetSurveysProject] = useState(false);

  //contextmenu
  const [showContextMenu, setShowContextMenu] = useState('none');
  const [topContextMenu, setTopContextMenu] = useState(0);
  const [leftContextMenu, setLeftContextMenu] = useState(0);
  const [codproject, setCodProject] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    store.dispatch(getProjects())
  }, [match])


  useEffect(() => {
    Array.isArray(userloggedin.access) ? userloggedin.access.map((e, index) => {
      if(e.endpoint==='/projects' && e.method==='POST')
        setPostProject(true)

      if(e.endpoint==='/projects' && e.method==='PUT')
        setPutProject(true)

      if(e.endpoint==='/projects' && e.method==='DELETE')
        setDeleteProject(true)

      if(e.endpoint==='/projects/{project}/members' && e.method==='POST')
        setPostProjectMembers(true)

      if(e.endpoint==='/projects/{project}/members' && e.method==='DELETE')
        setDeleteProjectMembers(true)

      if(e.endpoint==='/projects/{project}/surveys' && e.method==='GET')
        setGetSurveysProject(true)

    }):<></>
  }, [userloggedin])



  useEffect(() => {
    setDataProvinces([])
    Array.isArray(provinces.provinces)?provinces.provinces.map((e, i)=>{
      const data= {
        label: e.name,
        value: e.cod_dpa
      }
      setDataProvinces(oldArray => [...oldArray, data])
    }):null
  }, [provinces]);

  useEffect(() => {
    if(dpa.dpa)
    Array.isArray(dpa.dpa.children)?
      dpa.dpa.children.map((e,i)=>{
        if(e.type==='canton'){
          const data={
            label:e.name,
            value:e.cod_dpa
          }
          setDataCanton(oldArray => [...oldArray, data])
        }
        if(e.type==='parish'){
          const data={
            label:e.name,
            value:e.cod_dpa
          }
          setDataParish(oldArray => [...oldArray, data])
        }
      })
      :null
  }, [dpa]);

  useEffect(() => {
    if(project.project&&update){
      setName(project.project.name)
      setResolution(project.project.resolution)
      setDetail(project.project.detail)
      store.dispatch(getProvinces())
      setBtnSubmitValue('put')
      setShow(true)
      setUpdate(false)
    }
  }, [project]);

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof postproject.error!='undefined'){
      postproject.error===false?alertify.success("Se creo correctamente"):alertify.error("Ocurrio un error al intentar Guardar")
      setBtnSubmit(false)
      setShow(false)
      store.dispatch(getProjects())
      props.postProject()
    }
  }, [postproject])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof deleteproject.error!='undefined'){
      deleteproject.error===false?alertify.success("Se elimino correctamente"):alertify.error("Ocurrio un error al intentar eliminar")
      store.dispatch(getProjects())
      props.deleteProject(null)
    }
  }, [deleteproject])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof putproject.error!='undefined'){
      putproject.error===false?alertify.success("Se actualizo correctamente"):alertify.error("Ocurrio un error al intentar actualizar")
      setBtnSubmit(false)
      store.dispatch(getProjects())
      props.putProject(null,null)
      setShow(false)
    }
  }, [putproject])

  const handleClose = () =>setShow(false)

  const handleShow = () => {
    store.dispatch(getProvinces())
    setName('')
    setResolution('')
    setDetail('')
    setBtnSubmitValue('post')
    setShow(true)
  }

  const handleSubmit=(e)=>{
      e.preventDefault()
      setBtnSubmit(true)
      const data={
        "name":name,
        "detail":detail,
        "resolution":resolution,
        "cod_dpa":cod_dpa
      }
      if(e.target.submit.value==='post')
        props.postProject(data)

      if(e.target.submit.value==='put')
        props.putProject(codproject,data)
  }

  const handleChange=(e)=>{
    const id=e.target.value
    setCodDpa(id)
    if(e.target.id==='province'){
      setDataCanton([])
      setDataParish([])
    }
    if(e.target.id==='canton'){
      setDataParish([])
    }
    store.dispatch(getDpa(id))
  }


  const handleClick=()=> {
    setShowContextMenu('none')
  }

  const handleContextMenu=(e)=>{
    e.preventDefault()
    setLeftContextMenu(e.pageX)
    setTopContextMenu(e.pageY)
    setShowContextMenu('block')
    setCodProject(e.currentTarget.id)
  }

  const handleClickMod=()=>{
    props.getProject(codproject)
    setShowContextMenu('none')
    setUpdate(true)
  }

  const handleClickDel=()=>{
    setShowContextMenu('none')
    alertify.confirm('Eliminar Proyecto', `¿Seguro de eliminar?`,()=> {props.deleteProject(codproject) }
      , function () {
      });
  }
  return  <>
    <div className="card">
      <div className="card-header">
        <div className={style.row}>
          <h6 className="col-11 m-0 font-weight-bold text-primary">Proyectos</h6>
          {postProject?<Button className="btn btn-primary" variant="primary" onClick={handleShow}>
            Nuevo
          </Button>:<></>}
        </div>
      </div>
      <div className="card-body py-3">
        <div className={style.container}>
          <div className={style.grid}>
            {
              Array.isArray(projects.projects)?projects.projects.map((e, i) => {
              return<Card
                  onClick={handleClick}
                  onContextMenu={handleContextMenu}
                  key={i}
                  {...e}
                />
              }):<></>
            }
          </div>
        </div>
      </div>
    </div>
    {getSurveysProject|postProjectMembers|putProject|deleteProject?<div className={style.menu} style={{display:showContextMenu,top:`${topContextMenu}px`,left:`${leftContextMenu}px`}} >
      <ul className={style.options}>
        {getSurveysProject?<li className={style.option}><Link to={`/projects/${codproject}/surveys`}>Encuestas</Link></li>:<></>}
        {putProject&&postProjectMembers||putProject&&deleteProjectMembers?<li className={style.option}><Link to={`/projects/${codproject}/members`}>Miembros</Link></li>:<></>}
        {putProject?<li className={style.option} onClick={handleClickMod}>Modificar</li>:<></>}
        {deleteProject?<li className={style.option} onClick={handleClickDel}>Eliminar</li>:<></>}
      </ul>
    </div>:<></>}
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Proyecto</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit.bind()}>
        <Modal.Body id="formproject">
          <Input
            defaultValue={name}
            id="name"
            name="name"
            type="text"
            label="Nombre *"
            autoFocus
            sty=''
            onChange={(e)=>{ setName(e.target.value)}}
            required
          />
          <Input
            sty=''
            defaultValue={resolution}
            id="resolution"
            name="resolution"
            type="text"
            label="Resolución *"
            required
            onChange={(e)=>{ setResolution(e.target.value)}}
          />
          <Textarea
            sty=''
            defaultValue={detail}
            id="detail"
            name="detail"
            type="text"
            label="Detalle"
            onChange={(e)=>{ setDetail(e.target.value)}}
          />
          <Select
            label="Provincia *"
            required
            options={dataprovinces}
            id="province"
            handleChange={handleChange}
            sty=''
          />
          <Select
            sty=''
            label="Cantón"
            id="canton"
            options={datacanton}
            handleChange={handleChange}
          />

          <Select
            label="Parroquia"
            id="parish"
            options={dataparish}
            handleChange={handleChange}
            sty=''
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button name="submit" value={btnSubmitValue} type="submit" variant="primary">{btnSubmit ? 'Guardando...' : 'Guardar'}</Button>
        </Modal.Footer>
      </form>
    </Modal>
</>
}

const mapStateToProps = (state) => ({
  projects:state.ProjectsState,
  provinces: state.ProvincesState,
  dpa: state.DpaState,
  postproject:state.PostProjectState,
  putproject:state.PutProjectState,
  deleteproject:state.DeleteProjectState,
  project:state.ProjectState,
  userloggedin: state.userLoggedInState
})

const mapDispatchToProps = {
  postProject, putProject, getProject, deleteProject
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)

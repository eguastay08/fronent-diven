import style from "./styles.module.scss";
import alertify from "alertifyjs";
import Input from "../../molecules/input/Input";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import store from "../../../redux/store";
import {Link, useParams} from "react-router-dom";
import {deleteAccess, getAccess, getRol, getRoles, postAccess, putRole} from "../../../redux/actionCreators";

const Form =(props)=>{
  const { rol ,access,putrole,postaccess, deleteaccess}=props
  const [bntSubmit, setBntSubmit] = useState(false);
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  let { id } = useParams();

  useEffect(() => {
    store.dispatch(getRol(id));
    store.dispatch(getAccess());
  }, [id]);

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof postaccess.error!='undefined'){
      postaccess.error===false?alertify.success("Se creó correctamente"):alertify.error("Ocurrió un error al intentar Guardar")
      props.postAccess()
    }
  }, [postaccess])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof deleteaccess.error!='undefined'){
      deleteaccess.error===false?alertify.success("Se eliminó correctamente"):alertify.error("Ocurrió un error al intentar Guardar")
      props.deleteAccess()
    }
  }, [deleteaccess])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof putrole.error!='undefined'){
      putrole.error===false?alertify.success("Se eliminó correctamente"):alertify.error("Ocurrió un error al intentar Guardar")
      setBntSubmit(false)
      props.putRole(id,null)
    }
  }, [putrole])

  const handleSubmit = (e) => {
    e.preventDefault()
    setBntSubmit(true)
    const form = e.target
    const data = {
      "name":form.name.value,
      "detail":form.detail.value
    }
    props.putRole(id,data)
  }

  const handleChangeAccess=(e)=>{
    const form=e.target;
    const data={
      "cod_access":form.value
    }
    if(form.checked){
      props.postAccess(id,data)
    }else{
      props.deleteAccess(id,data)
    }
  }

  useEffect(() => {
    setName(rol?.rol?.name)
    setDetail(rol?.rol?.detail)
  }, [rol]);

 const data=rol.rol;

 return data!==undefined?<div>
  <div className="card-header py-3 ">
    <div className={style.row}>
      <h6 className="col-11 m-0 font-weight-bold text-primary">Editar Rol {data.name}</h6>
    </div>
  </div>
    <div className={style.card} >
      <form className={style.form}  onSubmit ={handleSubmit.bind()}>
        <Input
          id="name"
          name="name"
          type="text"
          label="Nombre"
          defaultValue={name}
          autoFocus
          onChange={(e)=>setName(e.target.value)}
        />
        <Input
          id="detail"
          name="detail"
          type="text"
          label="Detalle"
          defaultValue={detail}
          onChange={(e)=>setDetail(e.target.value)}
        />
        <button id="btn-input" type="submit" className="btn-diven btn-input btn btn-primary" disabled={!bntSubmit?false:true}>
          <img id="loading" className="d-none" title="loading" alt="loading" src=""/>
          <span>{!bntSubmit?`Guardar`:`Guardando...`}</span>
        </button>
        <Link to={'/roles'} className="btn btn-secondary col-md-8 col-lg-3 ms-3">Cancelar</Link>
      </form>
      <br/>
      <div className="card">
        <div className="card-header">Permisos</div>
            <div className="row">
              <div className="col">
                <div className={style.flex}>
                  {
                    Array.isArray(access.access)?access.access.map((e, key)=>{
                      return <div key={key} className="form-check form-switch">
                        <input defaultValue={e.cod_access} id="access"  onChange={handleChangeAccess} defaultChecked={data.access.find(d=>d.cod_access==e.cod_access)!==undefined?true:false} className="form-check-input" type="checkbox" role="switch" name="access"/>
                        <label className="form-check-label" htmlFor="access">{e.name}</label>
                      </div>
                    }):<></>
                  }
            </div>
              </div>
            </div>
      </div>
    </div>
  </div>:<></>
}

const mapStateToProps = (state) => ({
  rol: state.RolState,
  access: state.AccessState,
  putrole:state.PutRoleState,
  deleteaccess: state.DeleteAccessState,
  postaccess:state.PostAccessState
});

const mapDispatchToProps = {
  getRol,getAccess, putRole,postAccess, deleteAccess
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);

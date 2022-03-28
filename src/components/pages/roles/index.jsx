import style from './styles.module.scss'
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import store from "../../../redux/store";
import {deleteRole, getRoles, postRole} from "../../../redux/actionCreators";
import {Link} from "react-router-dom";
import alertify from "alertifyjs";
import {Button, Modal} from "react-bootstrap";
import Input from "../../molecules/input/Input";

const Roles =(props)=> {
  const {userloggedin,match, roles, role,deleterole} = props
  const [show, setShow] = useState(false)
  const [btnSubmit, setBtnSubmit] = useState(false)
  const [postRol, setPostRol] = useState(false);
  const [putRol, setPutRol] = useState(false);
  const [deleteRol, setDeleteRol] = useState(false);

  useEffect(() => {
    store.dispatch(getRoles())
  }, [match])

  useEffect(() => {
    Array.isArray(userloggedin.access) ? userloggedin.access.map((e, index) => {
      if(e.endpoint==='/roles' && e.method==='POST')
        setPostRol(true)

      if(e.endpoint==='/roles' && e.method==='PUT')
        setPutRol(true)

      if(e.endpoint==='/roles' && e.method==='DELETE')
        setDeleteRol(true)

    }):<></>
  }, [userloggedin])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof role.error!='undefined'){
      role.error===false?alertify.success("Se creó correctamente"):alertify.error("Ocurrió un error al intentar Guardar")
      setBtnSubmit(false)
      setShow(false)
      store.dispatch(getRoles())
      props.postRole()
    }
  }, [role])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof deleterole.error!='undefined'){
      deleterole.error===false?alertify.success("Se eliminó correctamente"):alertify.error("No se puede eliminar")
      store.dispatch(getRoles())
      props.deleteRole()
    }
  }, [deleterole])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    setBtnSubmit(true)
    const form = e.target
    const data = {
      "name": form.name.value,
      "detail": form.detail.value
    }
    props.postRole(data)
  }

  const handleDelete = (data) => {
      alertify.confirm('Eliminar Rol', `¿Seguro de eliminar el rol: ${data.name}?`,()=> {props.deleteRole(data.cod_rol) }
      , function () {
      });
  }


  return <>
    <div className="card-header py-3">
      <div className={style.row}>
        <h6 className="col-11 m-0 font-weight-bold text-primary">Administrar Roles</h6>
        {postRol===true?<Button className="btn btn-primary" variant="primary" onClick={handleShow}>
          Nuevo
        </Button>:<></>}
      </div>
      <div className={style.card}>
        <div className={style.tresposive} id="table">
          <table className="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Detalle</th>
              <th scope="col">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {
              Array.isArray(roles.roles) ? roles.roles.map((e, index) => {
                return (
                  <tr key={e.cod_rol}>
                    <th scope="row">{e.cod_rol}</th>
                    <td>{e.name}</td>
                    <td>{e.detail}</td>
                    <td>
                      {putRol?<Link to={`/roles/${e.cod_rol}`} title="Editar">
                        <i className="fas fa-user-edit"></i>
                      </Link>:<></>}
                      {deleteRol? <a style={{cursor:'pointer'}} onClick={()=>handleDelete({'name':e.name,'cod_rol':e.cod_rol})} className="delete"  title="Eliminar">
                        <i className="fas fa-trash-alt"></i>
                      </a>:<></>}
                    </td>
                  </tr>
                )
              }) : <></>
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Rol</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit.bind()}>
      <Modal.Body>
          <Input
            id="name"
            name="name"
            type="text"
            label="Nombre"

            autoFocus
          />
          <Input
            id="detail"
            name="detail"
            type="text"
            label="Detalle"
          />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button type="submit" variant="primary">{btnSubmit ? 'Guardando...' : 'Guardar'}</Button>
      </Modal.Footer>
      </form>
    </Modal>
  </>
}
  const mapStateToProps = (state) => ({
    roles: state.RoleState,
    role: state.PostRoleState,
    deleterole:state.DeleteRoleState,
    userloggedin: state.userLoggedInState
  })

  const mapDispatchToProps = {
    postRole, deleteRole
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Roles)

import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import style from "./styles.module.scss";
import Input from "../../molecules/input/Input";
import Select from "../../molecules/Select";
import {deleteUser, getRoles, getUsers, postUser} from "../../../redux/actionCreators";
import {connect} from "react-redux";
import store from "../../../redux/store";
import {Link} from "react-router-dom";
import alertify from "alertifyjs";

const Users=(props)=>{
  const {match,roles,users,user,deleteuser,userloggedin}=props
  const [postUser, setPostUser] = useState(false)
  const [putUser, setPutUser] = useState(false)
  const [deleteUser, setDeleteUser] = useState(false)
  const [show, setShow] = useState(false)
  const [btnSubmit, setBtnSubmit] = useState(false)
  const [sroles, setSroles] = useState([]);

  useEffect(() => {
    //store.dispatch(getRoles())
    store.dispatch(getUsers())
  }, [match])

  useEffect(() => {
    Array.isArray(userloggedin.access) ? userloggedin.access.map((e, index) => {
      if(e.endpoint==='/users' && e.method==='POST')
        setPostUser(true)

      if(e.endpoint==='/users' && e.method==='PUT')
        setPutUser(true)

      if(e.endpoint==='/users' && e.method==='DELETE')
        setDeleteUser(true)

    }):<></>
  }, [userloggedin])

  useEffect(() => {
    setSroles([])
    Array.isArray(roles.roles) ? roles.roles.map((e, index) =>{
      const data={
        label: e.name,
        value: e.cod_rol
      }
      setSroles(oldArray => [...oldArray, data])
    }):<></>
  }, [roles])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof user.error!='undefined'){
      user.error===false?alertify.success("Se creó correctamente"):alertify.error("Ocurrió un error al intentar Guardar")
      setBtnSubmit(false)
      setShow(false)
      store.dispatch(getUsers())
      props.postUser()
    }
  }, [user])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof deleteuser.error!='undefined'){
      deleteuser.error===false?alertify.success("Se eliminó correctamente"):alertify.error("No se puede eliminar")
      store.dispatch(getUsers())
      props.deleteUser()
    }
  }, [deleteuser])

  const handleClose = () => setShow(false)

  const handleShow = () => {
    store.dispatch(getRoles())
    setShow(true)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    setBtnSubmit(true)
    const form = e.target
    const data = {
      name:form.name.value,
      lastname:form.lastname.value,
      email:form.email.value,
      gender:form.gender.value,
      cod_rol:form.cod_rol.value,
      password:form.password.value
    }
    props.postUser(data)
  }

  const handleDelete=(data)=>{
    alertify.confirm('Eliminar Usuario', `¿Seguro de eliminar el usuario: ${data.name}?`,()=> {props.deleteUser(data.id) }
      , function () {
      });
  }
  const gender_options= [
        {
          label: "Masculino",
          value: "male",
        },
        {
          label: "Femenino",
          value: "female",
        },
        {
          label: "Otro",
          value: "other",
        },
      ]

  return (
    <>
    <div className="card-header py-3">
      <div className={style.row}>
        <h6 className="col-11 m-0 font-weight-bold text-primary">Administrar Usuarios</h6>
        {postUser?<Button className="btn btn-primary" variant="primary" onClick={handleShow}>
          Nuevo
        </Button>:<></>}
      </div>
      <div className={style.card}>
        <div className={style.tresposive} id="table">
          <table className="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Imagen</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Correo Electronico</th>
              <th scope="col">Género</th>
              <th scope="col">Activo</th>
              <th scope="col">Rol</th>
              <th scope="col">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {
              Array.isArray(users.users) ? users.users.map((e, index) => {
                return (
                  <tr key={e.id}>
                    <th scope="row">{e.id}</th>
                    <td>
                      <img className={style.image} src={e.photography} alt={`${e.name} ${e.lastname}`}/>
                    </td>
                    <td>{e.name}</td>
                    <td>{e.lastname}</td>
                    <td>{e.email}</td>
                    <td>{e.gender==='male'?'Masculino':e.gender==='famele'?'Femenino':'Otro'}</td>
                    <td>{e.active?'Activo':'Inactivo'}</td>
                    <td>{e.rol}</td>
                    <td>
                      {putUser?<Link to={`/users/${e.id}`} title="Editar">
                        <i className="fas fa-user-edit"></i>
                      </Link>:<></>}
                      {deleteUser? <a style={{cursor:'pointer'}} onClick={()=>handleDelete({'name':e.name,'id':e.id})} className="delete"  title="Eliminar">
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
          <Modal.Title>Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit.bind()}>
          <Modal.Body>
            <Input
              id="name"
              name="name"
              type="text"
              label="Nombre"
              required
            />
            <Input
              id="lastname"
              name="lastname"
              type="text"
              label="Apellido"
            />
            <Input
              id="email"
              name="email"
              type="email"
              label="Correo Electronico"
              required
            />
            <Input
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              required
            />
            <Select
              label="Género"
              required
              options={gender_options}
              id="gender"
              name="gender"
            />
            {Array.isArray(sroles)?<Select
              label="Rol"
              options={sroles}
              id="cod_rol"
              name="cod_rol"
            />:<></>}
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
  )
}
const mapStateToProps = (state) => ({
  roles: state.RoleState,
  users:state.UsersState,
  user:state.PostUserState,
  deleteuser:state.DeleteUserState,
  userloggedin: state.userLoggedInState
})

const mapDispatchToProps = {
  postUser, deleteUser
}


export default connect(mapStateToProps, mapDispatchToProps)(Users)

import {getRoles, getUser, getUsers, putUser} from "../../../redux/actionCreators";
import {connect} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import store from "../../../redux/store";
import Input from "../../molecules/input/Input";
import Select from "../../molecules/Select";
import style from "./styles.module.scss"
import alertify from "alertifyjs";
import Password from "../../molecules/input/Password";



const UserForm=(props)=>{
  const {user,roles,putuser}=props
  let { id } = useParams();
  const [sroles, setSroles] = useState([]);
  const [btnSubmit, setBtnSubmit] = useState(false)

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    store.dispatch(getRoles())
    store.dispatch(getUser(id))
  }, [id])


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
    if(typeof putuser.error!='undefined'){
      putuser.error===false?alertify.success("Se actualizó correctamente"):alertify.error("Ocurrió un error al intentar Actualizar")
      setBtnSubmit(false)
      props.putUser()
    }
  }, [putuser])

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
    props.putUser(id,data)
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

  useEffect(() => {
    setName(user?.user?.name)
    setLastname(user?.user?.lastname)
    setEmail(user?.user?.email)
  }, [user]);


  const data=user.user;

  return data!==undefined?<div>
    <div className="card-header py-3 ">
      <div>
        <h6 className="col-11 m-0 font-weight-bold text-primary">Editar Usuario {data.name}</h6>
      </div>
    </div>
    <div className="row m-2">
      <div className="col-md-11">
        <div className="row">
          <form className={style.uform} onSubmit={handleSubmit.bind()}>
            <div className="row">
            <Input
              sty="col-md-12 col-lg-6"
              id="name"
              name="name"
              type="text"
              label="Nombre"
              required
              onChange={(e)=>setName(e.target.value)}
              defaultValue={name}
            />
            <Input
              sty="col-md-12 col-lg-6"
              id="lastname"
              name="lastname"
              type="text"
              label="Apellido"
              onChange={(e)=>setLastname(e.target.value)}
              defaultValue={lastname}

            />
            <Input
              sty="col-md-12 col-lg-6"
              id="email"
              name="email"
              type="email"
              label="Correo Electronico"
              required
              onChange={(e)=>setEmail(e.target.value)}
              defaultValue={email}
            />
            <Password
              sty="col-md-12 col-lg-6"
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              onChange={(e)=>setPassword(e.target.value)}
              defaultValue={password}
            />
            <Select
              sty="col-md-12 col-lg-6"
              label="Género"
              required
              options={gender_options}
              id="gender"
              name="gender"
              defaultValue={data.gender}
            />
            {Array.isArray(sroles)?<Select
              sty="col-md-12 col-lg-6"
              label="Rol"
              options={sroles}
              id="cod_rol"
              name="cod_rol"
              defaultValue={data.role.cod_rol}
            />:<></>}
              <button type="submit" className="btn btn-primary col-md-8 col-lg-3">{btnSubmit ? 'Guardando...' : 'Guardar'}</button>
              <Link to={'/users'} className="btn btn-secondary col-md-8 col-lg-3 ms-3">Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>:<></>
}

const mapStateToProps = (state) => ({
  roles: state.RoleState,
  user: state.UserState,
  putuser: state.PutUserState
})

const mapDispatchToProps = {
  putUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);

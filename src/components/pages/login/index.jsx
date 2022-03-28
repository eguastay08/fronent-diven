import style from './styles.module.scss'
import logo from '../../../assets/img.png'
import Input from '../../molecules/input/Input'
import {FaGoogle} from "react-icons/fa";
import Axios from "axios";
import {useLocation} from "react-router";
import {useState} from "react";
import {Link} from "react-router-dom";
import Password from "../../molecules/input/Password";

export default function Login(){

  const [error, setError] = useState(false);
  const [bntLogin, setBntLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let path =query.get('path')
  const authentication = e => {
    setBntLogin(true)
    setError(false)
    e.preventDefault()
    const form = e.target
    const API_URL=process.env.REACT_APP_API_URL

    const data = {
      "email":email,
      "password":password
    }
    Axios.post(`${API_URL}/api/v1/auth/login`, data)
      .then(r => {
        localStorage.clear()
        localStorage.setItem('user',JSON.stringify(r.data.data.user))
        localStorage.setItem('access-token',JSON.stringify(r.data.data.access_token))
        if(path===null || path==='/logout'){
          path='/'
        }
       window.location=path
      })
      .catch(er => {
        form.password.value=null
        setBntLogin(false)
        setError(true)
      })
  }

  return (
    <main className={style.container}>
        <div className={style.login}>
          <div className={style.cform}>
            <div className={style.header}>
              <span>Iniciar Sesión</span>
            </div>
            <div className={style.body}>
              <form onSubmit ={authentication.bind()}>
                  <Input
                    id="email"
                    type="email"
                    label="Correo electrónico"
                    autoFocus
                    defaultValue={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                <Password
                  id="password"
                  label="Contraseña"
                  autoComplete="off"
                  defaultValue={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                {error?<div className={style.error}>Usuario o Contraseña Incorrectos</div>:<></>}

                <button id="btn-input" type="submit" className="btn-diven btn-input btn btn-primary" disabled={!bntLogin?false:true}>
                  <img id="loading" className="d-none" title="loading" alt="loading" src=""/>
                  <span>{!bntLogin?`Ingresar`:`Ingresando...`}</span>
                </button>
                <Link to="/login/google" className="btn-diven btn-input btn btn-primary">
                  <FaGoogle/>
                  <span>Correo Institucional</span>
                </Link>
              </form>
            </div>
          </div>
          <div className={style.footer}>
            <div>Copyright © 2022</div>
            <div>Vicerrectorado de Investigación y Vinculación| UEB</div>
          </div>
        </div>
        <div className={style.img}>
          <img src={logo}/>
        </div>
    </main>)
}

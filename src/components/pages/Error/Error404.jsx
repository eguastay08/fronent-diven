import style from './style.module.scss'
import {Link} from "react-router-dom";

const Error404=()=>{
 return <div className={style.error}>
    <span>404</span>
    <p>Recurso no <b>Encontrado</b></p>
   <p><Link to="home">Inicio</Link></p>
  </div>
}

export default Error404

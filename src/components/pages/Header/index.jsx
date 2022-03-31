import style from './styles.module.scss'
import {Link} from "react-router-dom";
//import logo from '../../../assets/logo.svg'
import logo from '../../../assets/img.png'
import {getUserLoggedIn} from "../../../redux/actionCreators";
import {useEffect} from "react";
import store from "../../../redux/store";
import { connect } from "react-redux";
import Loading from "./loading";

const Header=(props)=>{
  const { userloggedin, handleToggleSidebar,toggled }=props

  const username = `${userloggedin.name} ${userloggedin.lastname}  `;
  const imageuser = userloggedin.photography;
  return userloggedin.name==null? <Loading/>:
  (
    <header>
      <div className={style.bar} aria-expanded={toggled}  onClick={() => handleToggleSidebar(true)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={style.logo}>
        <Link to="/">
          <img src={logo} alt="Logo DIVEN" />
        </Link>
      </div>
      <div className={style.datauser}>
        <span>
        <strong className={style.name}>{username}</strong>
        <Link to="/logout">Salir</Link>
        </span>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  userloggedin: state.userLoggedInState,
});

export default connect(mapStateToProps, {})(Header);

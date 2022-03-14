import {useEffect, useState} from "react";
import Header from "../pages/Header";
import {Navigate} from "react-router-dom";
import Nav from "../pages/Nav";
import style from '../../styles/styles.module.scss'
import {connect} from "react-redux";
import store from "../../redux/store";
import {getAccess, getUserLoggedIn} from "../../redux/actionCreators";

const Protected=({match,setScrooltop, children })=>{

  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (!localStorage.getItem("access-token")) {
    localStorage.clear();
    const uri = window.location.pathname+encodeURIComponent(window.location.search)
    return <Navigate to={`/login?path=${uri}`} />
  }
  useEffect(() => {
    store.dispatch(getAccess())
  }, [match])

  useEffect(() => {
    store.dispatch(getUserLoggedIn());
  }, [match]);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };


  const handleScroll=(e)=> {
    setScrooltop(e.target.scrollTop)
  };

  return (
    <>
      <Header
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        toggled={toggled}
      />
      <div className={style.body}>
        <Nav
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />
        <main onScroll={handleScroll}  >
          {children}
        </main>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  userloggedin: state.userLoggedInState
})

export default connect(mapStateToProps, {})(Protected)

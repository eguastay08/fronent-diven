import {Menu, MenuItem, ProSidebar, SidebarFooter} from "react-pro-sidebar"
import {useEffect, useState} from "react"
import {Link, NavLink} from "react-router-dom";
import Loading from "./Loading";
import {connect} from "react-redux";
import store from "../../../redux/store";
import {getNavigation} from "../../../redux/actionCreators";
import ItemNav from "./ItemNav";
import {ImExit} from "react-icons/im";
import {FaChevronCircleLeft, FaChevronCircleRight} from "react-icons/fa";
import style from '../../../styles/styles.module.scss'

const Nav=(props)=>{
  const { toggled, handleToggleSidebar, match, nav }=props
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    store.dispatch(getNavigation());
  }, [match]);

  const handleCollapsedChange = (checked) => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  return !nav.usernav ? (
    <Loading />
  ) : (
    <ProSidebar
      image={false}
      collapsed={collapsed}
      breakPoint="md"
      toggled={toggled}
      onToggle={handleToggleSidebar}
    >
      {nav.usernav ? <ItemNav data={nav.usernav} /> : <></>}
      <div className="btn-logout-bar">
        <Menu>
          <MenuItem icon={<ImExit />}>
            <NavLink to="/logout">Salir</NavLink>
          </MenuItem>
        </Menu>
      </div>
      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        >
          <span onClick={handleCollapsedChange} className="btn text-white">
            {collapsed ? <FaChevronCircleRight /> : <FaChevronCircleLeft />}
          </span>
        </div>
      </SidebarFooter>
      {!collapsed?<div className={style.footer}>
        <div>Copyright © 2022</div>
        <div>Vicerrectorado de Investigación y Vinculación | UEB</div>
        <a style={{color:'white'}} href="/humans/">Equipo de Desarrollo</a>
      </div>:<></>}
    </ProSidebar>)
}
const mapStateToProps = (state) => ({
  nav: state.NavigationState,
});

export default connect(mapStateToProps, {})(Nav);

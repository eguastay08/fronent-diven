import style from './style.module.scss'
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import store from "../../../redux/store";
import {
  deleteMember,
  getMembers,
  getProject,
  getRol,
  getRoles,
  getUsers,
  postMember
} from "../../../redux/actionCreators";
import Input from "../../molecules/input/Input";
import alertify from "alertifyjs";

const Members=(props)=>{
  const { id } = useParams()
  const {project, match, members, deletemember,postmember,userloggedin} =props

  const [name, setName] = useState();
  const [lusers, setLUsers] = useState([]);
  const [lusersf, setLUsersf] = useState([]);
  const [lmembers, setLMembers] = useState([]);
  const [lmembersf, setLMembersf] = useState([]);
  const [searchusers, setSearchusers] = useState();
  const [searchmembers, setSearchmembers] = useState();
  const [btnSubmitAdd, setBtnSubmitAdd] = useState(false);
  const [btnSubmitDel, setBtnSubmitDel] = useState(false);

  //ACCESS
  const [deleteProjectMembers, setDeleteProjectMembers] = useState(false);
  const [postProjectMembers, setPostProjectMembers] = useState(false);


  useEffect(() => {
    Array.isArray(userloggedin.access) ? userloggedin.access.map((e, index) => {

    if(e.endpoint==='/projects/{project}/members' && e.method==='POST')
      setPostProjectMembers(true)

    if(e.endpoint==='/projects/{project}/members' && e.method==='DELETE')
      setDeleteProjectMembers(true)

    }):<></>
  }, [userloggedin])


  useEffect(() => {
    store.dispatch(getProject(id))
    store.dispatch(getMembers(id))
  }, [match]);

  useEffect(() => {
    if(project.project)
      setName(project.project.name)
  }, [project]);

  useEffect(() => {
    setLMembers([])
    setLUsers([])
    Array.isArray(members.members)?
      members.members.map((e)=>{
        const data={
          "value":e.id,
          "name":`${e.name} ${e.lastname}`
        }
        e.member?setLMembers(oldArray => [...oldArray, data]):setLUsers(oldArray => [...oldArray, data])
      }):null
  }, [members]);


  useEffect(() => {
    const expresion = new RegExp(`${searchusers}.*`, "i");
    const lusersf = lusers.filter(user => expresion.test(user.name||user.lastname));
    setLUsersf([])
    lusersf.map((e)=> {
      const data = {
        "value": e.id,
        "name": `${e.name}`
      }
      setLUsersf(oldArray => [...oldArray, data])
    })
  }, [searchusers]);

  useEffect(() => {
    const expresion = new RegExp(`${searchmembers}.*`, "i");
    const lmembersf = lmembers.filter(user => expresion.test(user.name||user.lastname));
    setLMembersf([])
    lmembersf.map((e)=> {
      const data = {
        "value": e.id,
        "name": `${e.name}`
      }
      setLMembersf(oldArray => [...oldArray, data])
    })
  }, [searchmembers]);

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof deletemember.error!='undefined'){
      deletemember.error===false?alertify.success("Se eliminó correctamente"):alertify.error("Ocurrió un error al intentar remover")
      setBtnSubmitDel(false)
      store.dispatch(getMembers(id))
      props.deleteMember(null,null)
    }
  }, [deletemember])

  useEffect(() => {
    alertify.set("notifier", "position", "bottom-rigth");
    if(typeof postmember.error!='undefined'){
      postmember.error===false?alertify.success("Se agregó correctamente"):alertify.error("Ocurrió un error al intentar agregar")
      setBtnSubmitAdd(false)
      store.dispatch(getMembers(id))
      props.postMember(null,null)
    }
  }, [postmember])


  const handleClickAdd=(e)=>{
    e.preventDefault()
    setBtnSubmitAdd(true)
    const usr=document.getElementById('users')
    for (var i = 0; i < usr.options.length; i++) {
      if(usr.options[i].selected ==true){
        const data={
          user_id:usr.options[i].value
        }
        props.postMember(id,data)
      }
    }
  }

  const handleClickDel=(e)=>{
    e.preventDefault()
    setBtnSubmitDel(true)
    const usr=document.getElementById('members')
    for (var i = 0; i < usr.options.length; i++) {
      if(usr.options[i].selected ==true){
        const data={
          user_id:usr.options[i].value
        }
        props.deleteMember(id,data)
      }
    }
  }

  return<div className="card">
    <div className="card-header">
      <div className={style.row}>
        <h6 style={{textAlign:'center'}} className="col-11 m-0 font-weight-bold text-primary">Administrar Miembros Proyecto {name}</h6>
      </div>
    </div>
    <div className="card-body py-3">
      <div className={style.members} >
        <form>
          <table>
            <tbody>
              <tr>
                <td id={style.members}>
                  <p><b>Miembros</b></p>
                  <div>
                    <select id="members" name="memebers" size="20" multiple className="form-control no-overflow">
                      <optgroup>
                        {
                         lmembersf.length===0?lmembers.map((e, i) => {
                            return <option key={i} value={e.value}>{`${e.name}`}</option>
                          }):lmembersf.map((e, i) => {
                           return <option key={i} value={e.value}>{`${e.name}`}</option>
                         })
                        }
                      </optgroup>
                    </select>
                    <div className={style.search}>
                      <Input
                        id="searchmembers"
                        onChange={(e)=>setSearchmembers(e.target.value)}
                        value={searchmembers}
                        type="text"
                        label="Buscar Miembros"
                      />
                    </div>
                  </div>
                </td>
                <td className={style.btns}>
                  {postProjectMembers?<input disabled={btnSubmitAdd} onClick={handleClickAdd} type="submit" value="◄&nbsp;Agregar"/>:<></>}
                  {deleteProjectMembers?<input disabled={btnSubmitDel} onClick={handleClickDel} type="submit" value="Quitar&nbsp;►"/>:<></>}
                </td>
                <td>
                  <p><b>Usuarios</b></p>
                  <select name="users" id="users" size="20" multiple className="form-control no-overflow">
                    <optgroup>
                      {
                        lusersf.length===0?lusers.map((e,i)=>{
                            return<option key={i} value={e.value}>{e.name}</option>
                          }):lusersf.map((e,i)=>{
                          return<option key={i} value={e.value}>{e.name}</option>
                        })
                      }
                    </optgroup>
                  </select>
                  <div className={style.search}>
                    <Input
                      onChange={(e)=>setSearchusers(e.target.value)}
                      id="searchusers"
                      value={searchusers}
                      type="text"
                      label="Buscar Usuarios"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </div>
}

const mapStateToProps = (state) => ({
  project:state.ProjectState,
  members:state.MembersState,
  deletemember:state.DeleteMemberState,
  postmember:state.PostMemberState,
  userloggedin: state.userLoggedInState
})

const mapDispatchProps={
  postMember, deleteMember
}

export default connect(mapStateToProps, mapDispatchProps)(Members)

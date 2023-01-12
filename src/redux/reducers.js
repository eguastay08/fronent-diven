import {
  DELETE_ACCESS,
  DELETE_MEMBER, DELETE_OPTION, DELETE_PROJECT, DELETE_QUESTION,
  DELETE_ROLE,
  DELETE_SECTION, DELETE_SURVEY,
  DELETE_USER, DUPLICATE_SURVEY,
  GET_ACCESS,
  GET_DPA,
  GET_MEMBERS_PROJECT,
  GET_NAVIGATION,
  GET_PROJECT,
  GET_PROJECTS,
  GET_PROVINCES,
  GET_ROL,
  GET_ROLES,
  GET_SURVEY,
  GET_SURVEYS, GET_SURVEYS_GRAPHS, GET_SURVEYS_RESPONSES,
  GET_USER,
  GET_USER_LOGGEDIN,
  GET_USERS,
  POST_ACCESS,
  POST_MEMBER, POST_OPTION,
  POST_PROJECT,
  POST_QUESTION,
  POST_ROLE,
  POST_SECTION,
  POST_SURVEY,
  POST_USER, PUT_OPTION,
  PUT_PROJECT,
  PUT_QUESTION,
  PUT_ROLE,
  PUT_SECTION, PUT_SURVEY,
  PUT_USER
} from "./actions";


export const userLoggedIn=(state={}, action)=>{
  if(action.type===GET_USER_LOGGEDIN){
    return action.userloggedin
  }

  return state
}

export const getNavigation=(state={}, action)=>{
  if(action.type===GET_NAVIGATION){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }
    return {
      error:false,
      usernav:action.nav
    }
  }

  return state
}

export const getRoles=(state={}, action)=>{
  if(action.type===GET_ROLES){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }
    return {
      error:false,
      roles:action.roles
    }
  }

  return state
}

export const getRol=(state={}, action)=>{
  if(action.type===GET_ROL){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }
    return {
      error:false,
      rol:action.rol
    }
  }

  return state
}

export const getAccess=(state={}, action)=>{
  if(action.type===GET_ACCESS){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }
    return {
      error:false,
      access:action.access
    }
  }

  return state
}

export const putRole=(state={}, action)=>{
  if(action.type===PUT_ROLE){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false
    }
  }
  return state
}

export const postAccess=(state={}, action)=>{
  if(action.type===POST_ACCESS){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false
    }
  }
  return state
}

export const deleteAccess=(state={}, action)=>{
  if(action.type===DELETE_ACCESS){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false
    }
  }
  return state
}

export const postRole=(state={}, action)=>{
  if(action.type===POST_ROLE){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false
    }
  }
  return state
}

export const deleteRole=(state={}, action)=>{
  if(action.type===DELETE_ROLE){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false
    }
  }
  return state
}


export const postUser=(state={}, action)=>{
  if(action.type===POST_USER){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false
    }
  }
  return state
}

export const getUsers=(state={}, action)=>{
  if(action.type===GET_USERS){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }
    return {
      error:false,
      users:action.users
    }
  }

  return state
}

export const deleteUser=(state={}, action)=>{
  if(action.type===DELETE_USER){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false
    }
  }
  return state
}

export const putUser=(state={}, action)=>{
  if(action.type===PUT_USER){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false
    }
  }
  return state
}

export const getUser=(state={}, action)=>{
  if(action.type===GET_USER){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      user:action.user
    }
  }
  return state
}

export const getProjects=(state={}, action)=>{
  if(action.type===GET_PROJECTS){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      projects:action.projects
    }
  }
  return state
}

export const getProvinces=(state={}, action)=>{
  if(action.type===GET_PROVINCES){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      provinces:action.provinces
    }
  }
  return state
}

export const getDpa=(state={}, action)=>{
  if(action.type===GET_DPA){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      dpa:action.dpa
    }
  }
  return state
}

export const postProject=(state={}, action)=>{
  if(action.type===POST_PROJECT){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false
    }
  }
  return state
}

export const getProject=(state={}, action)=>{
  if(action.type===GET_PROJECT){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      project:action.project
    }
  }
  return state
}

export const getMembers=(state={}, action)=>{
  if(action.type===GET_MEMBERS_PROJECT){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      members:action.members
    }
  }
  return state
}

export const postMember=(state={}, action)=>{
  if(action.type===POST_MEMBER){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      member:action.member
    }
  }
  return state
}

export const deleteMember=(state={}, action)=>{
  if(action.type===DELETE_MEMBER){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      member:action.member
    }
  }
  return state
}

export const getSurveys=(state={}, action)=>{
  if(action.type===GET_SURVEYS){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      surveys:action.surveys
    }
  }
  return state
}

export const putProject=(state={}, action)=>{
  if(action.type===PUT_PROJECT){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false
    }
  }
  return state
}

export const deleteProject=(state={}, action)=>{
  if(action.type===DELETE_PROJECT){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      project:action.project
    }
  }
  return state
}

export const postSurvey=(state={}, action)=>{
  if(action.type===POST_SURVEY){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      survey:action.survey
    }
  }
  return state
}

export const getSurvey=(state={}, action)=>{
  if(action.type===GET_SURVEY){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      survey:action.survey
    }
  }
  return state
}

export const putSurvey=(state={}, action)=>{
  if(action.type===PUT_SURVEY){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      survey:action.survey
    }
  }
  return state
}

export const deleteSurvey=(state={}, action)=>{
  if(action.type===DELETE_SURVEY){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      survey:action.survey
    }
  }
  return state
}

export const postSection=(state={}, action)=>{
  if(action.type===POST_SECTION){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      section:action.section
    }
  }
  return state
}

export const putSection=(state={}, action)=>{
  if(action.type===PUT_SECTION){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      section:action.section
    }
  }
  return state
}

export const deleteSection=(state={}, action)=>{
  if(action.type===DELETE_SECTION){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      section:action.section
    }
  }
  return state
}

export const postQuestion=(state={}, action)=>{
  if(action.type===POST_QUESTION){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      question:action.question
    }
  }
  return state
}

export const putQuestion=(state={}, action)=>{
  if(action.type===PUT_QUESTION){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      question:action.question
    }
  }
  return state
}

export const deleteQuestion=(state={}, action)=>{
  if(action.type===DELETE_QUESTION){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      question:action.question
    }
  }
  return state
}


export const postOption=(state={}, action)=>{
  if(action.type===POST_OPTION){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      option:action.option
    }
  }
  return state
}

export const putOption=(state={}, action)=>{
  if(action.type===PUT_OPTION){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      option:action.option
    }
  }
  return state
}

export const deleteOption=(state={}, action)=>{
  if(action.type===DELETE_OPTION){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      option:action.option
    }
  }
  return state
}

export const getResponses=(state={}, action)=>{
  if(action.type===GET_SURVEYS_RESPONSES){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      response:action.response
    }
  }
  return state
}

export const getGraphs=(state={}, action)=>{
  if(action.type===GET_SURVEYS_GRAPHS){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      graphs:action.graphs
    }
  }
  return state
}

export const duplicateSurvey=(state={}, action)=>{
  if(action.type===DUPLICATE_SURVEY){
    if(action.error===true){
      return{
        error:true,
        errors:action.errors
      }
    }else if(action.clean===true){
      return {}
    }
    return {
      error:false,
      survey:action.survey
    }
  }
  return state
}

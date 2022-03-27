import Axios from "axios";
import {
  DELETE_ACCESS,
  DELETE_MEMBER, DELETE_OPTION, DELETE_PROJECT, DELETE_QUESTION,
  DELETE_ROLE, DELETE_SECTION, DELETE_SURVEY,
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
  GET_SURVEYS, GET_SURVEYS_RESPONSES,
  GET_USER,
  GET_USER_LOGGEDIN,
  GET_USERS,
  POST_ACCESS,
  POST_MEMBER, POST_OPTION,
  POST_PROJECT, POST_QUESTION,
  POST_ROLE,
  POST_SECTION,
  POST_SURVEY,
  POST_USER, PUT_OPTION,
  PUT_PROJECT, PUT_QUESTION,
  PUT_ROLE, PUT_SECTION, PUT_SURVEY,
  PUT_USER
} from "./actions";

const API_URL = process.env.REACT_APP_API_URL;

const verifyError=(error)=>{
  try{
    if(error.status===401){
      localStorage.clear();
      const uri = window.location.pathname+encodeURIComponent(window.location.search)
      window.location.href = `/login?path=${uri}`
    }
    if(error.status===500 || error.status===404 || error.status===403){
     // window.location.href = `/404`
    }
  }catch(e){
    //window.location.href = `/404`
  }

}

export const verifyToken = () => {
  if (!localStorage.getItem("access-token")) {
    localStorage.clear()
    const uri = window.location.pathname+window.location.search
    window.location.href = `/login?path=${uri}`
  } else {
    return JSON.parse(localStorage.getItem("access-token")).token;
  }
};

export const getUserLoggedIn = () => (dispatch) => {
  const token = verifyToken();
  Axios.get(`${API_URL}/api/v1/me`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      return dispatch({
        type: GET_USER_LOGGEDIN,
        userloggedin: resp.data.data,
      });
    })
    .catch((err) => {
      verifyError(err.response)
    });
};

export const getNavigation = () => (dispatch) => {
  const token = verifyToken();

  Axios.get(`${API_URL}/api/v1/me/navigation`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      return dispatch({
        type: GET_NAVIGATION,
        nav: resp.data.data,
      });
    })
    .catch((err) => {
      verifyError(err.response)
    });
};

export const getRoles = () => (dispatch) => {
  const token = verifyToken();

  Axios.get(`${API_URL}/api/v1/roles`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      return dispatch({
        type: GET_ROLES,
        roles: resp.data.data,
      });
    })
    .catch((err) => {
      verifyError(err.response)
    });
};

export const getRol = (id=null) => (dispatch) => {
  const token = verifyToken();
  if(id===null){
    return dispatch({
      type: GET_ROL,
      clean: true,
    });
  }else {
    Axios.get(`${API_URL}/api/v1/roles/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: GET_ROL,
          rol: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
      });
  }
}

export const getAccess = () => (dispatch) => {
  const token = verifyToken();

  Axios.get(`${API_URL}/api/v1/access`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      return dispatch({
        type: GET_ACCESS,
        access: resp.data.data,
      });
    })
    .catch((err) => {
      verifyError(err.response)
    });
};

export const postRole = (dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: POST_ROLE,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.post(`${API_URL}/api/v1/roles`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: POST_ROLE,
          role: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: POST_ROLE,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const putRole = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: PUT_ROLE,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.put(`${API_URL}/api/v1/roles/${id}`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: PUT_ROLE,
          role: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: PUT_ROLE,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
}

export const postAccess = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: POST_ACCESS,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.post(`${API_URL}/api/v1/roles/${id}/access`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: POST_ACCESS,
          postaccess: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: POST_ACCESS,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const deleteAccess = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: DELETE_ACCESS,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.delete(`${API_URL}/api/v1/roles/${id}/access`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        cod_access: dat.cod_access
      }
    })
      .then((resp) => {
        return dispatch({
          type: DELETE_ACCESS,
          deleteaccess: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: DELETE_ACCESS,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const deleteRole = (dat= null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: DELETE_ROLE,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.delete(`${API_URL}/api/v1/roles/${dat}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((resp) => {
        return dispatch({
          type: DELETE_ROLE,
          deleterole: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: DELETE_ROLE,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const postUser = (dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: POST_USER,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.post(`${API_URL}/api/v1/users`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: POST_USER,
          user: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: POST_USER,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const getUsers = (search=null) => (dispatch) => {
  const token = verifyToken();

  Axios.get(`${API_URL}/api/v1/users${search!=null?`?search=${search}`:''}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      return dispatch({
        type: GET_USERS,
        users: resp.data.data,
      });
    })
    .catch((err) => {
      verifyError(err.response)
      return dispatch({
        type: GET_USERS,
        error: true,
        errors: err.response.data.data,
      });
    });
};

export const deleteUser = (dat= null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: DELETE_USER,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.delete(`${API_URL}/api/v1/users/${dat}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((resp) => {
        return dispatch({
          type: DELETE_USER,
          deleteuser: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: DELETE_USER,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const putUser = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: PUT_USER,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.put(`${API_URL}/api/v1/users/${id}`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: PUT_USER,
          user: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: PUT_USER,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const getUser = (id=null) => (dispatch) => {
  const token = verifyToken();
  if(id===null){
    return dispatch({
      type: GET_USER,
      clean: true,
    });
  }else {
    Axios.get(`${API_URL}/api/v1/users/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: GET_USER,
          user: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
      });
  }
};

export const getProjects = () => (dispatch) => {
  const token = verifyToken();
    Axios.get(`${API_URL}/api/v1/projects`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: GET_PROJECTS,
          projects: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
      });
};

export const getProvinces = () => (dispatch) => {
  const token = verifyToken();
  Axios.get(`${API_URL}/api/v1/dpa`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      return dispatch({
        type: GET_PROVINCES,
        provinces: resp.data.data,
      });
    })
    .catch((err) => {
      verifyError(err.response)
    });
};

export const getDpa = (id=null) => (dispatch) => {
  if(id===null){
    return dispatch({
      type: GET_DPA,
      clean: true,
    });
  }else {
    const token = verifyToken();
    Axios.get(`${API_URL}/api/v1/dpa/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: GET_DPA,
          dpa: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
      });
  }
};

export const postProject = (dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: POST_PROJECT,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.post(`${API_URL}/api/v1/projects`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: POST_PROJECT,
          project: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: POST_PROJECT,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const getProject = (id=null) => (dispatch) => {
  if(id===null){
    return dispatch({
      type: GET_PROJECT,
      clean: true,
    });
  }else {
    const token = verifyToken();
    Axios.get(`${API_URL}/api/v1/projects/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: GET_PROJECT,
          project: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
      });
  }
}

export const getMembers = (id=null) => (dispatch) => {
  if(id===null){
    return dispatch({
      type: GET_MEMBERS_PROJECT,
      clean: true,
    });
  }else {
    const token = verifyToken();
    Axios.get(`${API_URL}/api/v1/projects/${id}/members`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: GET_MEMBERS_PROJECT,
          members: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
      });
  }
};

export const postMember = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: POST_MEMBER,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.post(`${API_URL}/api/v1/projects/${id}/members`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: POST_MEMBER,
          member: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: POST_MEMBER,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const deleteMember = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: DELETE_MEMBER,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.delete(`${API_URL}/api/v1/projects/${id}/members`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        user_id: dat.user_id
      }
    })
      .then((resp) => {
        return dispatch({
          type: DELETE_MEMBER,
          member: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: DELETE_MEMBER,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const getSurveys = (id=null) => (dispatch) => {
  if(id===null){
    return dispatch({
      type: GET_SURVEYS,
      clean: true,
    });
  }else {
    const token = verifyToken();
    Axios.get(`${API_URL}/api/v1/projects/${id}/surveys`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: GET_SURVEYS,
          surveys: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
      });
  }
};

export const putProject = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: PUT_PROJECT,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.put(`${API_URL}/api/v1/projects/${id}`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: PUT_PROJECT,
          project: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: PUT_PROJECT,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const deleteProject = (dat= null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: DELETE_PROJECT,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.delete(`${API_URL}/api/v1/projects/${dat}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((resp) => {
        return dispatch({
          type: DELETE_PROJECT,
          project: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: DELETE_PROJECT,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const postSurvey = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: POST_SURVEY,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.post(`${API_URL}/api/v1/projects/${id}/surveys`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: POST_SURVEY,
          survey: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: POST_SURVEY,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const getSurvey = (id=null) => (dispatch) => {
  if(id===null){
    return dispatch({
      type: GET_SURVEY,
      clean: true,
    });
  }else {
    const token = verifyToken();
    Axios.get(`${API_URL}/api/v1/surveys/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: GET_SURVEY,
          survey: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
      });
  }
};

export const putSurvey = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: PUT_SURVEY,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.put(`${API_URL}/api/v1/surveys/${id}`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: PUT_SURVEY,
          survey: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: PUT_SURVEY,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const deleteSurvey = (dat= null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: DELETE_SURVEY,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.delete(`${API_URL}/api/v1/surveys/${dat}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((resp) => {
        return dispatch({
          type: DELETE_SURVEY,
          survey: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: DELETE_SURVEY,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const postSection = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: POST_SECTION,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.post(`${API_URL}/api/v1/surveys/${id}/sections`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: POST_SECTION,
          section: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: POST_SECTION,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const putSection = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: PUT_SECTION,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.put(`${API_URL}/api/v1/sections/${id}`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: PUT_SECTION,
          section: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: PUT_SECTION,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const deleteSection = (dat= null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: DELETE_SECTION,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.delete(`${API_URL}/api/v1/sections/${dat}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((resp) => {
        return dispatch({
          type: DELETE_SECTION,
          section: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: DELETE_SECTION,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const postQuestion = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: POST_QUESTION,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.post(`${API_URL}/api/v1/sections/${id}/questions`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: POST_QUESTION,
          question: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: POST_QUESTION,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const putQuestion = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: PUT_QUESTION,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.put(`${API_URL}/api/v1/questions/${id}`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: PUT_QUESTION,
          question: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: PUT_QUESTION,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const deleteQuestion = (dat= null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: DELETE_QUESTION,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.delete(`${API_URL}/api/v1/questions/${dat}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((resp) => {
        return dispatch({
          type: DELETE_QUESTION,
          question: resp.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: DELETE_QUESTION,
          error: true,
          errors: err.response.data,
        });
      });
  }
};

export const postOption = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: POST_OPTION,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.post(`${API_URL}/api/v1/questions/${id}/options`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: POST_OPTION,
          option: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: POST_OPTION,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const putOption = (id,dat = null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: PUT_OPTION,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.put(`${API_URL}/api/v1/options/${id}`, dat, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: PUT_OPTION,
          option: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: PUT_OPTION,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

export const deleteOption = (dat= null) => (dispatch) => {
  if (dat === null) {
    return dispatch({
      type: DELETE_OPTION,
      clean: true,
    });
  } else {
    const token = verifyToken();
    Axios.delete(`${API_URL}/api/v1/options/${dat}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((resp) => {
        return dispatch({
          type: DELETE_OPTION,
          option: resp.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: DELETE_OPTION,
          error: true,
          errors: err.response.data,
        });
      });
  }
};

export const getResponses = (id=null) => (dispatch) => {
  const token = verifyToken();
  if(id===null){
    return dispatch({
      type: GET_SURVEYS_RESPONSES,
      clean: true,
    });
  }else {
    Axios.get(`${API_URL}/api/v1/surveys/${id}/responses`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: GET_SURVEYS_RESPONSES,
          response: resp.data.data,
        });
      })
      .catch((err) => {
        verifyError(err.response)
        return dispatch({
          type: GET_SURVEYS_RESPONSES,
          error: true,
          errors: err.response.data,
        });
      });
  }
};

export const duplicateSurvey = (id=null) => (dispatch) => {
  const token = verifyToken();
  if(id===null){
    return dispatch({
      type: DUPLICATE_SURVEY,
      clean: true,
    });
  }else {
    Axios.get(`${API_URL}/api/v1/surveys/${id}/duplicate`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        return dispatch({
          type: DUPLICATE_SURVEY,
          survey: resp.data.data,
        });
      })
      .catch((err) => {
        return dispatch({
          type: DUPLICATE_SURVEY,
          error: true,
          errors: err.response.data.data,
        });
      });
  }
};

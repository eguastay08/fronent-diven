import {applyMiddleware, combineReducers, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import {
  userLoggedIn as userLoggedInState,
  getNavigation as NavigationState,
  getRoles as RoleState,
  getRol as RolState,
  getAccess as AccessState,
  postAccess as PostAccessState,
  putRole as PutRoleState,
  deleteAccess as DeleteAccessState,
  postRole as PostRoleState,
  deleteRole as DeleteRoleState,
  postUser as PostUserState,
  getUsers as UsersState,
  deleteUser as DeleteUserState,
  putUser as PutUserState,
  getUser as UserState,
  getProjects as ProjectsState,
  getProvinces as ProvincesState,
  getDpa as DpaState,
  postProject as PostProjectState,
  getProject as ProjectState,
  putProject as PutProjectState,
  deleteProject as DeleteProjectState,
  getMembers as MembersState,
  postMember as PostMemberState,
  deleteMember as DeleteMemberState,
  getSurveys as SurveysState,
  getSurvey as SurveyState,
  postSurvey as PostSurveyState,
  putSurvey as PutSurveyState,
  deleteSurvey as DeleteSurveyState,
  postSection as PostSectionState,
  putSection as PutSectionState,
  deleteSection as DeleteSectionState,
  postQuestion as PostQuestionState,
  putQuestion as PutQuestionState,
  deleteQuestion as DeleteQuestionState,
  postOption as PostOptionState,
  putOption as PutOptionState,
  deleteOption as DeleteOptionState

} from './reducers'

export default createStore(
  combineReducers({
    userLoggedInState,
    NavigationState,
    RoleState,
    RolState,
    AccessState,
    PostAccessState,
    PutRoleState,
    DeleteAccessState,
    PostRoleState,
    DeleteRoleState,
    PostUserState,
    UsersState,
    DeleteUserState,
    PutUserState,
    UserState,
    ProjectsState,
    ProvincesState,
    DpaState,
    PostProjectState,
    PutProjectState,
    DeleteProjectState,
    ProjectState,
    MembersState,
    PostMemberState,
    DeleteMemberState,
    SurveysState,
    PostSurveyState,
    PutSurveyState,
    DeleteSurveyState,
    SurveyState,
    PostSectionState,
    PutSectionState,
    DeleteSectionState,
    PostQuestionState,
    PutQuestionState,
    DeleteQuestionState,
    PostOptionState,
    PutOptionState,
    DeleteOptionState
  }),
  composeWithDevTools(applyMiddleware(thunk))
)
import '../styles/style.scss'
import style from '../styles/styles.module.scss'
import {Public} from "./routes/Public";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/login"
import LoginGoogle from "./organisms/LoginGoogle";
import Protected from "./routes/Protected";
import Home from "./pages/home";
import Logout from "./organisms/Logout";
import Roles from "./pages/roles";
import Form from "./pages/roles/Form";
import Users from "./pages/users";
import UserForm from "./pages/users/UserForm";
import Projects from "./pages/projects";
import Members from "./pages/members";
import Surveys from "./pages/surveys";
import SurveyEdit from "./pages/surveyedit";
import SurveyView from "./pages/surveyview";
import {useState} from "react";
import Error404 from "./pages/Error/Error404";
import Graphs from "./pages/graphs";

const App=()=> {
  const [scrooltop, setScrooltop] = useState(0);

  return (
    <div className={style.App}>
        <Routes>
          <Route path="/login" exact element={<Public><Login/></Public>}/>
          <Route path="/login/google" exact element={<Public><LoginGoogle/></Public>}/>

          <Route path="/logout" exact element={<Logout/>}/>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" exact element={<Protected><Home/></Protected>}/>
          <Route path="/roles" exact element={<Protected><Roles/></Protected>}/>
          <Route path="/roles/:id" exact element={<Protected><Form/></Protected>}/>
          <Route path="/users" exact element={<Protected><Users/></Protected>}/>
          <Route path="/users/:id" exact element={<Protected><UserForm/></Protected>}/>
          <Route path="/projects" exact element={<Protected><Projects/></Protected>}/>
          <Route path="/projects/:id" exact element={<Protected><Projects/></Protected>}/>
          <Route path="/projects/:id/members" exact element={<Protected><Members/></Protected>}/>
          <Route path="/projects/:id/surveys" exact element={<Protected><Surveys/></Protected>}/>
          <Route path="/surveys/:id/graphs" exact element={<Protected><Graphs/></Protected>}/>

          <Route path="/surveys/:id/edit" exact element={
            <Protected setScrooltop={setScrooltop} >
              <SurveyEdit scrooltop={scrooltop}/>
            </Protected>}/>
          <Route path="/surveys/:id/view" exact element={<Protected><SurveyView/></Protected>}/>
          <Route path="*" element={<Error404/>} />
        </Routes>
    </div>
  );
}

export default App;

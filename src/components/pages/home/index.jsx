import styles from './styles.module.scss'
import proyectos from '../../../assets/proyectos.svg'
import encuesta from '../../../assets/encuestas.svg'
import miembros from '../../../assets/miembros.svg'
import {useEffect, useState} from "react";
import {connect} from "react-redux";

const Home =({userloggedin})=>{
  const [postSurveys, setPostSurveys] = useState(false);
  const [postProjects, setPostProjects] = useState(false);
  const [postMembers, setPostMembers] = useState(false);

  useEffect(() => {
    Array.isArray(userloggedin.access) ? userloggedin.access.map((e, index) => {
      if(e.endpoint==='/projects' && e.method==='POST')
        setPostProjects(true)

      if(e.endpoint==='/projects/{project}/surveys' && e.method==='POST')
        setPostSurveys(true)

      if(e.endpoint==='/projects/{project}/members' && e.method==='POST')
        setPostMembers(true)

    }):<></>
  })

  return <div className={styles.home}>
        <div className={styles.title}>
          <span>Bienvenido</span>
          <p>Departamento de Investigación y Vinculación - Encuestas</p>
        </div>

        <div className={styles.body}>
          <p>DIVEN es un sistema de gestión de encuestas para los diferentes proyectos elaborados por el departamento, con el fin de facilitar el levantamiento de información y ahorrar recursos.</p>
          <p>El SIDETI-UEB es un sistema integrado donde se articulan la investigación, el desarrollo tecnológico, y la innovación en la Universidad Estatal de Bolívar, marca la normativa y los procedimientos para el desarrollo de las actividades en coordinación con las funciones sustantivas que rigen el sistema de educación superior nacional e internacional.</p>
        </div>
        {postProjects|postSurveys|postMembers?<div className={styles.footer}>
            <p  className={styles.subtitle}>Operaciones Principales</p>
            <div className={styles.img}>
              {postProjects?<div>
                <img src={proyectos} alt="Proyectos"/>
                <p className={styles.subtitle}>Crear Proyectos</p>
                <p>Cree su proyecto en el que necesite aplicar encuestas.</p>
              </div>:<></>}
              {postSurveys?<div>
                <img src={encuesta} alt="Encuesta"/>
                <p className={styles.subtitle}>Crear Encuestas</p>
                <p>Agregue diferentes tipos de preguntas a la encuesta.</p>
              </div>:<></>}
              {postMembers?<div>
                <img src={miembros} alt="Miembros"/>
                <p className={styles.subtitle}>Asignar Miembros</p>
                <p>Otorgue el acceso al proyecto estudiantes y directivos</p>
              </div>:<></>}
            </div>
        </div>:<></>}
  </div>
}

const mapStateToProps = (state) => ({
  userloggedin: state.userLoggedInState
})
export default connect(mapStateToProps, {})(Home)

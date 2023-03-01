import styles from "./style.module.scss";
import {Modal} from "react-bootstrap";
import ManageCharts from "./ManageCharts";
import {useState} from "react";
import style from "./style.module.scss";

const GraphImage=(props)=>{
  const {question}=props
  const [show, setShow] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const handleClose = () =>setShow(false)

  const handleShow = (e) => {
    e.stopPropagation()
    setShow(true)
  }

  return<>
    <h3 className={styles.title}>{question.question}</h3>
    <button onClick={handleShow} className="btn-diven btn-input btn btn-primary">Ver Fotografiás</button>
    <Modal
      fullscreen={true}
      show={show}
      onHide={handleClose}
      keyboard={false}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{question.question}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card-body py-3" style={{background: '#F3F5F8'}}>
          <div className={style.container}>
            <div className={style.charts}>
              {
                question?.data.map((e,i)=>{
                  return <div className={style.chart}>
                    <img src={`${API_URL}/api/v1/image/${e?.image}`} style={{width:'100%', height:'400px'}}/>
                    <div>{e?.answer_txt}</div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </>

}


export default GraphImage

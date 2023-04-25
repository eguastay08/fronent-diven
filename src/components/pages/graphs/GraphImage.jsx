import styles from "./style.module.scss";
import {Modal} from "react-bootstrap";
import ManageCharts from "./ManageCharts";
import {useState} from "react";
import style from "./style.module.scss";
import GraphWordCloudChart from "./GraphWordCloudChart";

const GraphImage=(props)=>{
  const {question, options}=props
  const [show, setShow] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const handleClose = () =>setShow(false)

  const handleShow = (e) => {
    e.stopPropagation()
    setShow(true)
  }

  return<>
    <GraphWordCloudChart
      question={question}
      options={options}
      answers={0}
      tot_answers={0}
    />
    <div style={{display:'flex',justifyContent:'center'}}>
      <button onClick={handleShow} className="btn-diven btn-input btn btn-primary">Ver Fotografiás</button>
    </div>
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
                question?.img.map((e,i)=>{
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
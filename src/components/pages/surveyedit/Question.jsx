import style from "./styles.module.scss";
import Input from "../../molecules/input/Input";
import Select from "../../molecules/Select";
import {useState} from "react";
import {FaTrashAlt} from "react-icons/fa";
import Options from "./Options";




const Question=(props)=>{
  const {stsave,options,cod_question,cod_survey}=props
  const [type_question, setType_question] = useState(props.type);
  const [question] = useState(props.question);
  const [required] = useState(props.required);

  const type_questions=[
    {
      label: "Respuesta Corta",
      value: "short_answer",
    },
    {
      label: "Párrafo",
      value: "long_text"
    },
    {
      label: "Opción Multiple",
      value: "multiple_choice"
    },
    {
      label: "Selección Multiple",
      value: "checkboxes"
    },
    {
      label: "Desplegable",
      value: "dropdown"
    },
    {
      label: "Fecha",
      value: "date"
    },
    {
      label: "Hora",
      value: "time"
    },
    {
      label: "Número",
      value: "numerical"
    }
  ]


  return<section onClick={props.onClick} id={cod_question} className={style.question}>
    <div className={style.content}>
      <div className={style.cques}>
        <div className={style.cinpts} >
          <div className={style.cinput}>
            <Input
              name="question"
              id="question"
              type="text"
              label="Pregunta"
              autoComplete="off"
              defaultValue={question}
              onBlur={props.onFocus}
            />
          </div>
          <div className={style.select}>
            <Select
              opnull={true}
              defaultValue={type_question}
              options={type_questions}
              id="type_question"
              name="type"
              handleChange={(e)=>setType_question(e.target.value)}
              onBlur={props.onFocus}
            />
          </div>
        </div>
        <div className={style.options}>
          {
            type_question==='short_answer'?
            <div className={style.short}>
              <Input
                id="short_answer"
                type="text"
                label="Respuesta Corta"
                autoComplete="off"
                disabled={true}
              />
            </div>:
              type_question==='long_text'?
                <div className={style.long}>
                  <Input
                    id="long_text"
                    type="text"
                    label="Respuesta"
                    autoComplete="off"
                    disabled={true}
                  />
                </div>:
                type_question==='multiple_choice'?
                  <div className={style.multiplechoice}>
                    <Options
                      options={options}
                      type={type_question}
                      stsave={stsave}
                      cod_question={cod_question}
                      cod_survey={cod_survey}
                    />
                  </div>:
                  type_question==='checkboxes'?
                    <div className={style.multiplechoice}>
                      <Options
                        options={options}
                        type={type_question}
                        stsave={stsave}
                        cod_question={cod_question}
                        cod_survey={cod_survey}
                      />
                    </div>:
                    type_question==='dropdown'?
                      <div className={style.multiplechoice}>
                        <Options
                          options={options}
                          type={type_question}
                          stsave={stsave}
                          cod_question={cod_question}
                          cod_survey={cod_survey}
                        />
                      </div>:
                      type_question==='date'?
                        <div className={style.short}>
                          <Input
                            id="date"
                            type="date"
                            label="Fecha"
                            autoComplete="off"
                            disabled={true}
                          />
                        </div>:
                        type_question==='time'?
                          <div className={style.short}>
                            <Input
                              id="time"
                              type="time"
                              label="Hora"
                              autoComplete="off"
                              disabled={true}
                            />
                          </div>:
                          type_question==='datetime'?
                            <div className={style.short}>
                              <Input
                                id="datetime"
                                type="datetime-local"
                                label="Fecha-Hora"
                                autoComplete="off"
                                disabled={true}
                              />
                            </div>:
                            type_question==='numerical'?
                              <div className={style.short}>
                                <Input
                                  id="numerical"
                                  type="numeric"
                                  label="Número"
                                  autoComplete="off"
                                  disabled={true}
                                />
                              </div>:
                <></>
          }
        </div>
        <div className={style.footer}>
          <div className={style.foptions}>
            <div className="form-check form-switch">
              <input onChange={props.onFocus} defaultChecked={required} id="required" className="form-check-input" type="checkbox" role="switch" name="required"/>
              <label className="form-check-label" htmlFor="required">Requerido</label>
            </div>
            <div onClick={props.handleClick} className={`${style.btn} ${style.tooltip}`}>
              <span className={style.tooltiptext}>Eliminar</span>
              <FaTrashAlt/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Question

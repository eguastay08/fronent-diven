import style from './styles.module.scss'

const Select=(props)=>{
  const {options,label,defaultValue,id,name,required,handleChange,onBlur,opnull}= props
  return <div className={`${style.select} ${props.sty}`} >
    <span><b>{label}</b></span>
    <select onBlur={onBlur} onChange={handleChange} required={required} id={id}  name={name} defaultValue={defaultValue}  className={'form-select form-control'} >
      {!opnull?<option value="">Seleccionar...</option>:<></>}
    {
      Array.isArray(options)?options.map((g,index)=>{
        return<option key={index} value={g.value} >{g.label}</option>
      }):<></>
    }
  </select>
  </div>
}
export default Select

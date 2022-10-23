function FormSection({header, id}) {
  return(
    <div className="form-section">
      <h3 className="form-section__header">{header}</h3>
      <input className="form-section__input" id={id}/>
      <span className="form-section__err" id={`${id}-Error`}></span>
    </div>
  )
}

export default FormSection;
            
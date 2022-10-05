function FormSection({header, id}) {
  return(
    <div className="form-section">
      <h3 className="form-section__header">{header}</h3>
      <div className="form-section__input-background">
        <input className="form-section__input" id={id}/>
      </div>
      <span className="form-section__err" id={`${id}-Error`}></span>
    </div>
  )
}

export default FormSection;
            
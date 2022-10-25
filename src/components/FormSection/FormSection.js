function FormSection({header, inputSettings}) {

  const handleInput = (e) => {
    inputSettings.setValue(e.target.value);
  }

  return(
    <div className="form-section">
      <h3 className="form-section__header">{header}</h3>
      <input className="form-section__input"
        id={inputSettings.id}
        type={inputSettings.type}
        minLength={inputSettings.minLength || "0"}
        maxLength={inputSettings.maxLength || "9999"}
        onChange={handleInput}
      />
      <span className="form-section__err" id={`${inputSettings.id}-Error`}></span>
    </div>
  )
}

export default FormSection;
            
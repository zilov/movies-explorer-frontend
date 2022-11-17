function FormSection({header, inputSettings, validator}) {

  return(
    <div className="form-section">
      <h3 className="form-section__header">{header}</h3>
      <input className="form-section__input"
        type={inputSettings.type}
        {...validator.register(inputSettings.id, inputSettings.validator) }
      />
      {validator.errors?.[inputSettings.id] && <p className="form-section__err">{validator.errors?.[inputSettings.id]?.message || "Ошибка валидации!"}</p>}
    </div>
  )
}

export default FormSection;
            
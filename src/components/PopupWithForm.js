import React from "react";

function PopupWithForm(props) {
  return (
    <>
      <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button className="popup__close-btn " type="button" onClick={props.onClose}></button>
          <h3 className="popup__title">{props.title}</h3>
          <form className="popup__form" name={`form-${props.name}`} action="#" onSubmit={props.onSubmit}>
            {props.children}
            <button className="popup__button popup__save-btn" type="submit">{props.buttonName}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PopupWithForm;
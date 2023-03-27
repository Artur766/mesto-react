import React from "react";
import FormValidator from "../utils/FormValidator";
import { validationConfig } from "../utils/utils";

function PopupWithForm(props) {

  const popupRef = React.useRef();
  const formRef = React.useRef();

  React.useEffect(() => {
    const formValidator = new FormValidator(validationConfig, formRef.current);
    formValidator.enableValidation();
    formValidator.resetInput();
    if (!props.disabledButton) formValidator.disabledSubmitButton();
  }, [props.isOpen]);

  React.useEffect(() => {
    //закрытие на esc
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        //удаляем открытый попап
        props.onClose();
      }
    }

    function handleOverlayClose(evt) {
      if (evt.target === evt.currentTarget) {
        //удаляем открытый попап
        props.onClose();
      }
    }

    popupRef.current.addEventListener("mousedown", handleOverlayClose);
    document.addEventListener("keydown", handleEscClose);

    return () => {
      popupRef.current.removeEventListener("mousedown", handleOverlayClose);
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [props.onClose]);

  return (
    <div ref={popupRef} className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-btn " type="button" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={`form-${props.name}`} action="#" onSubmit={props.onSubmit} ref={formRef} >
          {props.children}
          <button className="popup__button popup__save-btn" type="submit" disabled={props.buttonState}>{props.buttonName}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
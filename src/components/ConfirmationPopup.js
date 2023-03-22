import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {


  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirmation"
      buttonName="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
    />
  )
}

export default ConfirmationPopup;
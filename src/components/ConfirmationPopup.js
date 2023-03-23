import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {

  function hanldeSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm
      onSubmit={hanldeSubmit}
      title="Вы уверены?"
      name="confirmation"
      buttonName="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
    />
  )
}

export default ConfirmationPopup;
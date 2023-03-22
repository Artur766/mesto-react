import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeTitleCard(e) {
    setName(e.target.value);
  }

  function handleChangeLinkCard(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
    setName("");
    setLink("");
  }

  function resetInputOnClickClose() {
    props.onClose();
    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Новое место"
      name="add"
      buttonName={props.buttonName}
      isOpen={props.isOpen}
      onClose={resetInputOnClickClose}
    >
      <input
        value={name}
        onChange={handleChangeTitleCard}
        className="popup__input popup__input_type_title"
        id="title-picture"
        name="titleInput"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__error popup__error_visable title-picture-error" />
      <input
        value={link}
        onChange={handleChangeLinkCard}
        className="popup__input popup__input_type_link"
        id="link-picture"
        name="linkInput"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error popup__error_visable link-picture-error " />
    </PopupWithForm>
  )
}

export default AddPlacePopup;


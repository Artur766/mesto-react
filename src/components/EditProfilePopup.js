import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);


  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser])

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose} >
      <input
        onChange={handleChangeName}
        className="popup__input popup__input_type_name"
        id="user-name"
        name="nameInput"
        type="text"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name}
      />
      <span className="popup__error popup__error_visable user-name-error" />
      <input
        onChange={handleChangeDescription}
        className="popup__input popup__input_type_job"
        id="job"
        name="jobInput"
        type="text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="20"
        value={description}
      />
      <span className="popup__error popup__error_visable job-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
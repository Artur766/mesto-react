import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarInputRef = React.useRef();


  function handleSubmit(e) {
    e.preventDefault();


    props.onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });

    avatarInputRef.current.value = "";

  }

  function resetInput() {
    props.onClose();
    avatarInputRef.current.value = "";
  }



  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name="avatar"
      buttonName={props.buttonName}
      isOpen={props.isOpen}
      onClose={resetInput}
    >
      <input
        ref={avatarInputRef}
        className="popup__input popup__input_type_link"
        id="link-avatar"
        name="linkInput"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error popup__error_visable link-avatar-error " />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;

import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }


  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <>
      <div className="wrapper">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleEditAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
      </div>
      <PopupWithForm title="Редактировать профиль" name="edit" buttonName="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} >
        <input className="popup__input popup__input_type_name" id="user-name" name="nameInput" type="text" placeholder="Имя"
          required minLength="2" maxLength="40" />
        <span className="popup__error popup__error_visable user-name-error" />
        <input className="popup__input popup__input_type_job" id="job" name="jobInput" type="text" placeholder="О себе"
          required minLength="2" maxLength="20" />
        <span className="popup__error popup__error_visable job-error" />
      </PopupWithForm>
      <PopupWithForm title="Новое место" name="add" buttonName="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_title" id="title-picture" name="titleInput" type="text" placeholder="Название" required minLength="2" maxLength="30" />
        <span className="popup__error popup__error_visable title-picture-error" />
        <input className="popup__input popup__input_type_link" id="link-picture" name="linkInput" type="url"
          placeholder="Ссылка на картинку" required />
        <span className="popup__error popup__error_visable link-picture-error " />
      </PopupWithForm>
      <PopupWithForm title="Обновить аватар" name="avatar" buttonName="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_link" id="link-avatar" name="linkInput" type="url"
          placeholder="Ссылка на картинку" required />
        <span className="popup__error popup__error_visable link-avatar-error " />
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="confirmation" buttonName="Да" />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
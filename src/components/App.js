
import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import api from "../utils/Api";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { CardContext } from "./contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUseer] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {

    const promises = [api.getInitialCards(), api.getUserInformation()];

    Promise.all(promises)
      .then((data) => {
        setCards(data[0]);
        setCurrentUseer(data[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  function handleCardLike(card) {
    // проверяем есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(cards.map(c => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });;
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleConfirmationClick() {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }


  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="wrapper">
          <Header />
          <CardContext.Provider value={cards}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleEditAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
            />
          </CardContext.Provider>
          <Footer />
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
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
        <PopupWithForm title="Вы уверены?" name="confirmation" buttonName="Да" isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
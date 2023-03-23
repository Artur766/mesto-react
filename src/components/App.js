import "../pages/index.css"
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import React from "react";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [card, setCard] = React.useState({});

  //обновляем данные пользователя и карточек
  React.useEffect(() => {

    const promises = [api.getInitialCards(), api.getUserInformation()];

    Promise.all(promises)
      .then((data) => {
        setCards(data[0]);
        setCurrentUser(data[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  function handleAddPlaceSubmit(card) {

    setIsLoading(true);

    api.createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  //постановка и снятие лайка 
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
      });
  }

  function handleUpdateUser(currentUser) {

    setIsLoading(true);

    api.setUserInfo(currentUser)
      .then((newDataUser) => {
        setCurrentUser(newDataUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(currentUser) {

    setIsLoading(true);

    api.setUserAvatar(currentUser)
      .then((newDataUser) => {
        setCurrentUser(newDataUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
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

  function handleConfirmationClick(card) {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
    setCard(card);
  }

  //удаление карточки
  function handleCardDelete(card) {

    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
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
              onCardDelete={handleConfirmationClick}
              onCardLike={handleCardLike}
            />
          </CardContext.Provider>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonName={isLoading ? "Сохранение..." : "Сохранить"}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonName={isLoading ? "Сохранение..." : "Сохранить"}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonName={isLoading ? "Создание..." : "Созать"}
        />
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={card}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
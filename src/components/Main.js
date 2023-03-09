import React from "react";
import api from "../utils/Api";
import Card from "./Card";



function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {

    const promises = [api.getInitialCards(), api.getUserInformation()];

    Promise.all(promises)
      .then((data) => {
        setUserName(data[1].name);
        setDescription(data[1].about);
        setUserAvatar(data[1].avatar);

        setCards(data[0])
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <main>
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__edit-avatar" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="аватарка" />
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-btn" type="button" onClick={props.onEditProfile} />
            </div>
            <p className="profile__job">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-btn" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        {cards.map((item) => (
          <Card card={item} key={item._id} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  )
}

export default Main;
import React from "react";

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="element" >
      <img className="element__photo" src={props.card.link} onClick={handleClick} alt={props.card.name} />
      <button className="element__basket" />
      <div className="element__wrapper">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__container">
          <button className="element__like-btn" type="button" />
          <p className="element__number-likes">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
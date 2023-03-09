import React from "react";

function ImagePopup(props) {

  return (
    <div className={`popup popup_type_increase ${props.card.link ? 'popup_opened' : ''}`} >
      <div className="popup__wrapper">
        <button className="popup__close-btn" type="button" onClick={props.onClose} />
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__description">{props.card.name}</p>
      </div>
    </div >
  )
}

export default ImagePopup;
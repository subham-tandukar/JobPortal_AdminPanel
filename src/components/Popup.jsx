import React, { useState } from "react";
import { MdClose } from "react-icons/md";

export default function Popup({
  setShowModal,
  handleClick,
  isDeleting,
  title,
}) {
  return (
    <div>
      <div className="custom__popup active popup__small">
        <div className="overlay" onClick={() => setShowModal(false)}></div>
        <div className="custom__popup__model">
          <div className="custom__popup__head">
            <div>
              <h2 className="th-title">{title}</h2>
            </div>
            <div className="close__popup" onClick={() => setShowModal(false)}>
              <MdClose />
            </div>
          </div>
          <div className="custom__popup__content !pb-10">
            Are you sure you want to {title}?
          </div>

          <div className="custom__popup__footer">
            <button
              disabled={isDeleting ? true : false}
              className={`th-btn ${title === "Approve" ? "success" : "danger"}`}
              onClick={handleClick}
            >
              {isDeleting ? <span>Please wait...</span> : <span>{title}</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

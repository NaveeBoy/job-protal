import React from "react";
import { BsFillPersonFill, BsChatDots } from "react-icons/bs";

const ChatMessage = (props) => {
  const handleClick = (option) => {
    if (props.onClick) {
      props.onClick(option);
    }
  };

  return (
    <div className={`d-flex ${props.user && 'justify-content-end'}`}>
      {props.user ? (
        <span className="message-right">
          <span className="message-text">{props.message}</span>
          <BsFillPersonFill className="message-icon" />
        </span>
      ) : (
        <span className="message-left">
          <BsChatDots className="message-icon" />
          <span className="message-text">{props.message}</span>
          {props.options && (
            <div className="options">
              {props.options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </span>
      )}
    </div>
  );
};

export default ChatMessage;

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
        <span className="message-right" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px'}}>
          <span className="message-text" style={{ wordWrap: 'break-word'}}>{props.message}</span>
          
        </span>
      ) : (
        <span className="message-left">
          <BsChatDots className="message-icon" style={{"marginRight":"10px"}} />
          <span className="message-text">{props.message}</span>
          {props.options && (
            <div className="options" >
              {props.options.map((option, index) => (
                <button style={{"fontSize":"17px"}}
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

import React, { useState, useEffect, useRef } from "react";
import { analyze } from "./utils";
import ChatMessage from "./ChatMessage";
import { IoMdClose } from "react-icons/io";
import "../Chatbot/Chatbot.css"; // Import CSS file for styling

const Chatbot = () => {
  const initialMessage = "Hi, Welcome to QuickJobs Chat, May I know your name?";

  const [messages, setMessages] = useState([{ message: initialMessage }]);
  const [text, setText] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    if (messages.length > 1) {
      setMessages([{ message: initialMessage }]);
      setUserName(null);
    }
    setIsChatOpen(!isChatOpen);
  };

  const onSend = (message = null) => {
    const userMessage = message || text;

    if (userMessage.trim().toLowerCase() === "clear") {
      setMessages([{ message: initialMessage }]);
      setText("");
      setUserName(null);
      return;
    }

    let list = [...messages, { message: userMessage, user: true }];

    if (!userName) {
      setUserName(userMessage);
      list = [
        ...list,
        { message: `Hi, ${userMessage}!` },
        {
          message: 'What would you like to know?',
          options: ['Contact', 'Email', 'Categories' ,'About us' ,"interview tips" ,"Apply"]
        }
      ];
    } else {
      const reply = analyze(userMessage);
      if (typeof reply === 'object' && reply.options) {
        list = [...list, { message: reply.message, options: reply.options }];
      } else {
        list = [...list, { message: reply }];
      }
    }

    setMessages(list);
    setText("");

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleOptionClick = (option) => {
    onSend(option);
  };

  return (
    <div>
      {!isChatOpen && (
        <div className="chat-bubble" onClick={toggleChat}>
          <img src="./icons8-chatbot.gif" alt="Chat bubble" width={80} height={80} />
        </div>
      )}
      {isChatOpen && (
        <div className="chat-container" ref={chatContainerRef} >
          <div className="chat-header">
            <img src="./icons8-chatbot.gif" alt="logo" width={40} height={40} />
            <h2 className=""> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chat with QuickJobs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
            <div className="close-btn" onClick={toggleChat}>
              <IoMdClose />
            </div>
          </div>

          <div className="chat-messages">
            {messages.length > 0 && messages.map((data, index) => (
              <div key={index}>
                <ChatMessage {...data} onClick={(message) => handleOptionClick(message)} />
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message here..."
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <button className="btn btn-primary" onClick={() => onSend()}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

import { createContext, useState } from "react";

export const MessageContext = createContext({
  messages: [],
  setMessages: () => {},
});

const MessageContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      message: "hello there, How can I help you today?",
      sender: "bot",
      type: "text",
    },
    {
      message: "Choose one of the options below",
      sender: "bot",
      type: "multiple",
      options: [
        { label: "Query a product" },
        { label: "File a complaint" },
        { label: "Track order" },
      ],
    },
  ]);
  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;

// t81XugtvwX4n0udWkE3NPzHSYrC3jk7AHb3guqsR

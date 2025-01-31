const Chatbot = ({ chatmessage }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-8 rounded-full border-2 border-black">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          />
        </div>
      </div>
      <div className="chat-bubble">{chatmessage}</div>
    </div>
  );
};

export default Chatbot;

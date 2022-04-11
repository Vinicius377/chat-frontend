function ChatBox({ user, usersList }) {
  return (
    <>
      <div className="message">
        <h1>{user ? user : "Digite seu nome"}</h1>
        <div className="container-chat">
          {usersList.map(userItem => (
            <div key={userItem.id}>
              <h3>{userItem.name}</h3>
              {userItem.message.map(userMessage => {
                return (
                  <div
                    key={userMessage}
                    className={`container-message ${
                      userItem.name == "you" ? "user" : "otherUser"
                    }`}
                  >
                    <p key={userItem.name}>{userMessage}</p>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ChatBox

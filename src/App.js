import React, { useRef, useState } from "react"
import { io } from "socket.io-client"
import "./style.scss"
import ChatBox from "./components/ChatBox"

const socket = io("ws://localhost:3001", { path: "/socket" })

export default function App() {
  const refMessage = useRef()
  const refName = useRef()
  const [user, setUser] = useState("")
  const [usersList, setUsersList] = useState([])

  const checkLastMessage = ({ id, name, message }) => {
    let lastIndex = usersList.length - 1

    if (usersList[lastIndex]?.id === id) {
      setUsersList(prevUsers => [
        ...prevUsers,
        (usersList[lastIndex] = {
          message: [...usersList[lastIndex].message, message],
        }),
      ])
      return
    } else {
      setUsersList(prevUsers => [
        ...prevUsers,
        {
          name: name == refName.current.value ? "you" : name,
          message: [message],
          id,
        },
      ])
    }
  }

  socket.on("connect", () => {
    socket.on("getMessage", resp => {
      checkLastMessage(resp)
    })
  })

  const sendMessage = e => {
    e.preventDefault()
    refName.current.disabled = true
    socket.emit("sendmessage", { user, message: refMessage.current.value })
    refMessage.current.value = ""
  }

  const changeNameUser = e => {
    setUser(e.target.value)
  }

  return (
    <div className="container">
      <form>
        <div className="inputs">
          <input
            onChange={changeNameUser}
            ref={refName}
            placeholder="digite seu nome"
          />
          <textarea ref={refMessage} placeholder="digite a mensagem"></textarea>
        </div>
        <button onClick={sendMessage}>Enviar</button>
      </form>
      <ChatBox user={user} usersList={usersList} />
    </div>
  )
}

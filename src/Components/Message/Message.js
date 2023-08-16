import React, { useEffect, useReducer, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'
import io from 'socket.io-client'
// import style from '../styles/ChatApp.style.css'
const socket = io('http://localhost:5000')
function ChatApp() {   // Messages -----------------------------------------------------------------
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])   // On récupère les messages et on les affiches
  useEffect(() => {
    socket.on('message', (data) => {
      setMessages([...messages, data])
      // Les 3 petits points vont sauvegarder les anciens messages
      // Donc, la fonction va récupérer les nouveaux messages et garder les anciens
    }); return () => {
      socket.off('message')
    }
  }, [messages]);  // Chat Liste ---------------------------------------------------------------
  const initialState = {
    loading: true,
    error: "",
    onlines: {}
  }; const reducer = (state, action) => {
    switch (action.type) {
      case "FECTCH_SUCCESS": return {
        loading: false,
        error: "",
        onlines: action.payload
      }
      case "FECTCH_ERROR": return {
        loading: false,
        error: "Something went wrong",
        onlines: {}
      }
      default: return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const [signalReceived, setSignalReceived] = useState(false);
  socket.on('online', () => {
    setSignalReceived(true)
  })
  useEffect(() => {
    setSignalReceived(false)
    axios.get('http://localhost:5000/chatliste', { withCredentials: true })
      .then(response => {
        dispatch({ type: "FECTCH_SUCCESS", payload: response.data })
        console.log(response);
      })
      .catch(error => {
        // console.log(error.code)
        dispatch({ type: "FECTCH_ERROR", payload: error })
      });
  }, [signalReceived]);    // Prendre l'ID de l'utilisateur ------------------------------------------
  const [ID, setID] = useState(null); useEffect(() => {
    axios.get('http://localhost:5000/idcheck', { withCredentials: true })
      .then(response => {
        setID(response.data)
        console.log(response.data)
      })
      .catch(error => {
        // console.log(error.code)
        dispatch({ type: "FECTCH_ERROR", payload: error })
      });
  }, [signalReceived]);    // Récupérer l'ID de l'username selectionné
  const [interlocuteur, setInterlocuteur] = useState(null); 
  const [isActive, setIsActive] = useState(false);
  const [EvenementId, setEvenementId] = useState(false); try {
    var enLigne = state.loading ? 'Loading ...' : state.onlines.map((online, index) => {
      return (
        <div key={index} className='ChatListeDetail'>
          <div id={index}
            onClick={(event) => {
              setEvenementId(event.target.id)
              setIsActive(true)
              return (setInterlocuteur(online._id))
            }}
            onBlur={() =>
              setIsActive(false)}
            className={`${ID === online._id ? 'hide' : EvenementId == index ? 'active' : "ChatListeDetail"}`}>
            {online.username}
          </div>
        </div>
      )
    })
  }
  catch (error) {
    console.log("Aucun utilisateur connecté");
    console.log(error)
    return (
      <div> Aucun utilisateur connecté </div>
    )
  }   // Envoyer le message au serveur
  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('message', message);
    setMessage('')
    //  socket.broadcast.to(interlocuteur).emit('message', message)
    //  setMessage('')
  }
  return (
    <React.Fragment>
      {/* Chat Liste */}
      <div id='ChatPage'>
        <div className='ChatList'>
          {enLigne}
        </div>
        <div>          {/* Totalité des messages */}
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                {msg}
              </li>
            ))}
          </ul>
          <form onSubmit={sendMessage}>
            <input type='text' value={message} onChange={(e) => setMessage(e.target.value)}
            />
            <button type='submit'>Send</button>          </form>        </div>
      </div>
    </React.Fragment>)
} export default ChatApp
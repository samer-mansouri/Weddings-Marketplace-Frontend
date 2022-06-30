import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { io } from "socket.io-client";
import Messages from "./Messages";
import TokenService from "../../services/token.service";
import { useParams } from "react-router-dom";

const HOST = 'http://localhost:5000';

function Chat({ socket }) {

  const { id } = useParams();


  // const socket = useRef();
  // const [contacts, setContacts] = useState([]);
  // const [currentChat, setCurrentChat] = useState(undefined);
  // const [currentUser, setCurrentUser] = useState(undefined);

  // useEffect(() => {
  //   socket.current = io(HOST);
  //   socket.current.emit('add-user', TokenService.getCurrentUserId())
  // }, []);
  return (
    <div className="w-full h-screen">
        <Messages
          socket={socket}
          to={id}
        />
    </div>
  )
}

export default Chat
import React from 'react';
import JoinContainer from "../Join/JoinContainer";
import RoomContainer from "../Room/RoomContainer";
import socket from "../../socket";
import './../../scss/main.scss';
import {BrowserRouter, Redirect, Route} from "react-router-dom";

function App(props) {
  // Ожидание и обработка сообщений с сервера
  React.useEffect(() => {
    // Пришло новое сообщение
    socket.on('NEW_MESSAGE', message => {
      props.sendNewMessage(message)
    })
    // Пользователь присоединился к комнате
    // Получаем список посетителей и сообщений
    socket.on('JOINED', data => props.setRoomData(data))
    // Изменение списка пользователей (пользователь покинул чат)
    socket.on('SET_USERS', users => {
      props.setRoomUsers(users)
    })
  }, [])

  return (
    <BrowserRouter>
      <Route exact path='/' component={() => props.isJoined ?
        <Redirect to={'/room/' + props.roomId}/> : <Redirect to={'/join'}/>
      }/>
      <Route path='/join' component={JoinContainer}/>
      <Route path='/room/' component={() => props.isJoined ?
        <RoomContainer/> : <JoinContainer/>
      }/>
    </BrowserRouter>
  );
}

export default App;

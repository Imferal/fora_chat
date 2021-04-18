import React from 'react';
import s from './Join.module.scss'
import axios from "axios";
import socket from "../../socket";
import {NavLink} from "react-router-dom";

export const Join = (props) => {
  // Берём roomId из url или генерируем новый
  let roomId = 'id' + (window.location.pathname.toString().indexOf('/room/id') !== (0 || -1) ?
    window.location.toString().split('/room/id')[1] :
    Math.floor(Math.random() * 9000000000 + 1000000000))

  const joinRoom = () => {
    // Формируем объект для отправки данных на сервер
    const userData = {
      roomId,
      userName: props.userName,
    }

    // Включаем статус "загрузка"
    props.setLoadingStatus(true)
    axios
      .post('http://localhost:9000', userData)
      .then(() => {
        // Выключаем статус "загрузка"
        props.setLoadingStatus(false)
        // Устанавливаем статус подключения к чату
        props.setJoinStatus(true)
        // Сохраняем данные пользователя в стейт
        props.setUserName(userData.userName)
        props.setRoomId(userData.roomId)
        // Подключение к комнате
        socket.emit('JOIN', userData)
      })
  }

  return (
    <div className={`${s.join} "fixedContainer"`}>
      <h1>ПростоЧат</h1>
      <p className={s.join__version}><small>v.000002</small></p>
      <p className={s.join__description}>Вводите своё имя и общайтесь! У нас всё просто!</p>
      <input className={s.join__input} id='name'
             type='text'
             placeholder="Придумайте крутой никнейм"
             value={props.userName}
             onChange={e => props.setUserName(e.target.value)}
             required/>
      <NavLink className={`${s.join__button} ${s.join__button_indent}`}
               type="submit"
               onClick={joinRoom}
               disabled={props.isLoading || roomId === '' || props.userName === ''}
               to={'/room/' + roomId}>
        {props.isLoading ? 'заходим...' : 'начать'}
      </NavLink>
    </div>
  )
}
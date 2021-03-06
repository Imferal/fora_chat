const SET_ROOM_DATA = 'SET_ROOM_DATA'
const SET_ROOM_USERS = 'SET_ROOM_USERS'
const SET_NEW_MESSAGE_TEXT = 'SET_NEW_MESSAGE_TEXT'
const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE'

const initialState = {
  users: [],
  messages: [],
  newMessageText: '',
}

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    // Изменение текста нового сообщения
    case 'SET_NEW_MESSAGE_TEXT':
      return {
        ...state,
        newMessageText: action.text,
      }

    // Сохранение всех данных комнаты
    case 'SET_ROOM_DATA':
      return {
        ...state,
        users: action.data.users,
        messages: action.data.messages,
      };

    // Сохранение данных о пользователях
    case 'SET_ROOM_USERS':
      return {
        ...state,
        users: action.users,
      };

    // Добавление нового сообщения
    case 'SEND_NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.message],
        newMessageText: '',
      };

    default:
      return state;
  }
};

export const setRoomData = data => ({
  type: SET_ROOM_DATA,
  data,
})

export const setRoomUsers = users => ({
  type: SET_ROOM_USERS,
  users,
})

export const sendNewMessage = message => ({
  type: SEND_NEW_MESSAGE,
  message,
})

export const setNewMessageText = text => ({
  type: SET_NEW_MESSAGE_TEXT,
  text,
})
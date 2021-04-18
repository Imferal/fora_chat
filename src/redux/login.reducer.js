const SET_ROOM_ID = 'SET_ROOM_ID';
const SET_USER_NAME = 'SET_USER_NAME';
const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
const SET_JOIN_STATUS = 'SET_JOIN_STATUS';

const initialState = {
  isLoading: false,
  isJoined: false,
  roomId: '',
  userName: '',
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    // Меняем статус загрузки комнаты (зашли/не зашли)
    case 'SET_LOADING_STATUS' :
      return {
        ...state,
        isLoading: action.status
      }

    // Меняем статус входа в комнату (зашли/не зашли)
    case 'SET_JOIN_STATUS' :
      return {
        ...state,
        isJoined: action.status
      }

    // Сохраняем id комнаты
    case 'SET_ROOM_ID':
      return {
        ...state,
        roomId: action.id
      };

    // Сохраняем имя пользователя
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.name
      };

    default:
      return state;
  }
};

export const setJoinStatus = status => ({
  type: SET_JOIN_STATUS,
  status,
})

export const setRoomId = id => ({
  type: SET_ROOM_ID,
  id,
})

export const setUserName = name => ({
  type: SET_USER_NAME,
  name,
})

export const setLoadingStatus = status => ({
  type: SET_LOADING_STATUS,
  status,
})

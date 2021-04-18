const express = require('express')
const cors = require("cors");
const PORT = process.env.PORT ?? 9000
const app = express()
const http = require('http').Server(app)

// Разрешаем CORS-запросы
app.use(cors())
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

// Подключаем JSON
app.use(express.json())

// Создаём пустую коллекцию
const rooms = {};

// Обработка GET-запроса (для проверки связи)
app.get('/', (req, res) => {
  res.json('GET-запрос прошёл успешно!')
})

// Обработка POST-запроса (при логине)
app.post('/', (req, res) => {
  const {roomId} = req.body;
  // Если комнаты не было - создаём новую коллекцию
  if (!rooms.hasOwnProperty(roomId)) {
    rooms[roomId] = {
      'users': {},
      'messages': []
    }
  }
  res.send();
})

// Работа с сокет-запросами
io.on('connection', (socket) => {

  // Пользователь присоединяется к комнате
  socket.on('JOIN', ({roomId, userName}) => {
    socket.join(roomId);
    // Получаем всех пользователей и добавляем туда нового
    rooms[roomId].users[socket.id] = userName
    // Получаем имена пользователей и сообщения из комнаты
    const users = [...Object.values(rooms[roomId].users)];
    const messages = [...rooms[roomId].messages.values()];
    // Оповещаем всех клиентов об изменении списка подключившихся
    io.in(roomId).emit('JOINED', ({users, messages}))
  })

  // Пользователь отправляет сообщение
  socket.on('NEW_MESSAGE', ({roomId, userName, text}) => {
    const newMessage = {
      userName,
      text,
    }
    // Добавляем сообщение в коллекцию
    rooms[roomId].messages.push(newMessage)
    // Обновляем список сообщений в комнате
    socket.to(roomId).emit('NEW_MESSAGE', newMessage)
  })

  // Пользователь отключается
  socket.on('disconnect', () => {
    let socketId = socket.id
    // Ищем пользователя по сокету во всех комнатах
    for (let room in rooms) {
      // Если нашли - удаляем пользователя
      if (socketId in rooms[room].users) {
        delete rooms[room].users[socket.id]
        // И оповещаем остальных пользователей
        let users = [...Object.values(rooms[room].users)];
        socket.to(room).emit('SET_USERS', users)
      }
  }})
})

// Слушаем порт на наличие ошибок
http.listen(PORT, (err) => {
  if (err) {
    throw Error(err)
  }
  // Если всё в порядке - запускаем
  console.log(`Server has been started on port ${PORT}...`)
})
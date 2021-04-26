const express = require('express')
const cors = require("cors");
const PORT = process.env.PORT ?? 9000
const app = express()
const http = require('http').Server(app)
const middlewares = require('./middlewares.js')
const events = require('./events')

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

// Обработка GET-запроса (для проверки связи)
app.get('/', middlewares.getHandler)

// Обработка POST-запроса (при логине)
app.post('/', middlewares.postHandler)

// Работа с сокет-запросами
io.on('connection', (socket) => {
  events(socket, io)
})

// Слушаем порт на наличие ошибок
http.listen(PORT, (err) => {
  if (err) {
    throw Error(err)
  }
  // Если всё в порядке - запускаем
  console.log(`Server has been started on port ${PORT}...`)
})
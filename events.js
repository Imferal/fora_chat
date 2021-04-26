const rooms = require('./rooms')

module.exports = function (socket, io){
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
}
const rooms = require('./rooms')

module.exports = {
  getHandler :  (req, res) => {
    res.json('GET-запрос прошёл успешно!')
  },
  postHandler : (req, res) => {
    const {roomId} = req.body;
    // Если комнаты не было - создаём новую коллекцию
    if (!rooms.hasOwnProperty(roomId)) {
      rooms[roomId] = {
        'users': {},
        'messages': []
      }
    }
    res.send();
  }
}
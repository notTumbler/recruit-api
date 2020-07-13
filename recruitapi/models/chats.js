const mongoose = require('mongoose')

const ChatsSchema = require('../schemas/chats')

module.exports = mongoose.model('Chats',ChatsSchema)

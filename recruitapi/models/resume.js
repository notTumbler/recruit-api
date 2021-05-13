const mongoose = require('mongoose')
const ResumeSchema = require('../schemas/resume')
module.exports = mongoose.model('Resume',ResumeSchema)



// const mongoose = require('mongoose')

// const ChatsSchema = require('../schemas/chats')

// module.exports = mongoose.model('Chats',ChatsSchema)
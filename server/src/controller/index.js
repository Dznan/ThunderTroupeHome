const mongoose = require("mongoose");
const userSchema = require('./user')
const registerSchema = require('./register')
const config = require('../../conf/conf')
const options = {
  user: config.mongodb.auth.user,
  pass: config.mongodb.auth.password,
  path: config.mongodb.path
}
let authUrl = "mongodb://"+ options.user + ':'+ options.pass + '@' + options.path
mongoose.connect(authUrl)
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
})

exports.User = mongoose.model('users',userSchema)
exports.Register = mongoose.model('register',registerSchema)


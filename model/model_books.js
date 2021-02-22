const mongo = require('mongodb')
const mongoose = require('mongoose')
let url ='mongodb+srv://admin:123456abcd@react-mern-node.z6bkl.mongodb.net/Books_crud?retryWrites=true&w=majority'
// let url ='mongodb://localhost:27017/Books_crud'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})

let db = mongoose.connection
db.on('error',console.error.bind(console,'MongoDB Connect Error'))


const bookSchema = mongoose.Schema({
     id:mongoose.Schema.ObjectId,
     name:String,
     author:String
})

module.exports = mongoose.model('books',bookSchema)


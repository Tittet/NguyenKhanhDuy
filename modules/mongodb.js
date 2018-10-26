const mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const db = 'kuri';

class databases{
    constructor(){
        connection();
    }
}

function connection(){
    mongoose.connect('mongodb://'+ server +'/' + db,  { useNewUrlParser: true } )
    .then(() =>{
        console.log('db connection successful!!!');
    })
    .catch(err =>{
        console.error('db connection fail!!!' + err);
    })
}

var Schema = mongoose.Schema;

var kuri_Schema = new Schema({
    fullname: String,
    birthday: Date,
    email: String,
    username: String,
    password: String
})

var kuri = mongoose.model('kuri', kuri_Schema);

module.exports = {
   create_db: new databases(),
   Schema: kuri
}
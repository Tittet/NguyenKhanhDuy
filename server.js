const express = require("express");
const app = express();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const passport_facebook = require('./modules/passport_facebook');
const mongodb = require("./modules/mongodb.js");
const ios = require('./modules/socketio.js').initialize(server);

var db = mongodb.create_db;
var schema = mongodb.Schema;
var a = [];
var nbr = 0;

app.use(express.static("public"));
app.set("view engine","ejs");   
app.set("views","views");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

server.listen(process.env.PORT || 3000);

passport_facebook.passport_sendfb(app);
passport_facebook.passport_callbackfb(app,() => {
    var x = passport_facebook.profileFields();
    console.log(x.user);
});
console.log(passport_facebook.profileFields.name);

app.post('/post-feedback', (req, res) => {
    var myData = new schema({
        fullname : req.body.name,
        birthday : req.body.birthday,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
    });
    var username = req.body.username;
    schema.findOne({username: username}, (err,user) => {
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(user){
            return res.status(400).render('signup');
        }
        if(!user){
            myData.save()
            .then(() => {
                res.status(200).render('list_room');
            })
            .catch(err => {
                res.status(400).send("fail: "+ err);
            })
        }
    })
    
})

app.get('/signup', (req,res) => {
    res.render('signup');
})

app.get('/caro', (req, res) =>{
    res.render('caro');
})

app.get('/list_room', (req, res) => {
    res.render('list_room');
})

var io = ios.of('/list_room');

app.post('/caro', (req, res) => {
    res.status(200).render('caro');
})

io.on('connection', socket => {
    console.log(socket.id + " Connected!!!");
    socket.emit('list-room',a);
    var create_number = (a) => {
        var number_room = Math.floor((Math.random()*1000) + 1);
        if(a.length == 0){
            a.push(number_room);
            io.emit('list-room', a);
            socket.emit('into-room');
            nbr = number_room;
        }
        else{
            let count = 0;
            var promise = new Promise((resolve, reject) => {
                for(var i=0; i<a.length; i++){
                    if(a[i] == number_room){
                        count++;
                    }
                }
                resolve(count);
            })
            promise.then(count => {
                if(count == 0){
                    a.push(number_room);
                    io.emit('list-room', a);
                    socket.emit('into-room');
                    nbr = number_room;
                }
                else{
                    create_number(a);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    socket.on('create-room', () => {
        var promise = new Promise((resolve, reject) => {
            resolve(create_number(a));
            
        })
        promise.then(() => {
            for(i in a){
                console.log("-"+a[i]+"-");
            }
        })
    })
    socket.on('join-room', data => {
        nbr = data;
        console.log("***"+data+"***");
    })
    socket.on("disconnect", () => {
        console.log(socket.id + " Disconnected!!!");
    })
})
io.on('connection', socket => {
    let out_room = 0;
    if(nbr != 0){
        out_room = nbr;
        socket.join(nbr);
        if(socket.adapter.rooms[nbr].length == 2){
            a[a.indexOf(out_room)] = Number("111"+a[a.indexOf(out_room)]);
            io.emit('list-room',a);
        }
        nbr = 0;
    }
    socket.on('danh-x', data => { 
        socket.broadcast.emit("send-x",data);
        console.log(data);
    })
    socket.on('hihi', data => {
        console.log(data);
    })
    socket.on("disconnect", () => {
        if(out_room != 0){
            if(socket.adapter.rooms[out_room] == undefined){
                a.splice(a.indexOf(out_room),1);
                io.emit('list-room', a);
            }
            else{
                if(socket.adapter.rooms[out_room].length == 1 ){
                    let xy = Number("111"+out_room);
                    var ttt = a[a.indexOf(xy)].toString();
                    ttt = Number(ttt.substring(3));
                    a[a.indexOf(xy)] = ttt;
                    io.emit('list-room',a);
                }
            }
        }
    })

})
app.post('/', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    schema.findOne({username: username, password: password}, (err, user) => {
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            return res.status(404).send();
        }
        return res.status(200).render('list_room');
    })
})

app.get('/', (req,res) => {
    res.render('index',{db: () => {
        db.kuris.find({}).toArray();
    }});
})
const socket = io("http://localhost:3000/list_room");
var number_room;
socket.on('created-room', data => {
    $("#room").append('<div class="card text-center">' + 
        '<div class="card-body">'+
        '<h3 class="card-title">' + data + '</h3>'+
        '<button type="button" class="btn btn-outline-success number-room">Vao Phong</button>'+
        '</div></div>'
    );
    number_room = document.getElementsByClassName('number-room');
})
socket.on('into-room',() => {
    $("#form2").submit();
})
$(document).ready(() => {
    socket.on('list-room', data => {
        for(i in data){
            $("#room").append('<div class="card text-center">' + 
                '<div class="card-body">'+
                '<h3 class="card-title">' + data[i] + '</h3>'+
                '<button type="button" class="btn btn-outline-success number-room">Vao Phong</button>'+
                '</div></div>'
            );    
        }
        number_room = document.getElementsByClassName('number-room');
        for(let j = 0; j<number_room.length; j++){
            number_room[j].onclick = () => {
                console.log("*"+data[j]+"*");
                socket.emit('join-room',data);
            }
        }
    })
    $("#create_room").click(() => {
        socket.emit('create-room');
    })
    
})
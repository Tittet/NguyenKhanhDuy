const socket = io("http://localhost:3000/list_room");
var number_room;
socket.on('into-room',() => {
    $("#form2").submit();
})
$(document).ready(() => {
    socket.on('list-room', data => {
        $("#room").empty();
        for(i in data){
            if(data[i] > 1000){
                data[i] = ""+data[i];
                data[i] = Number(data[i].substring(3));
                $("#room").append('<div class="card text-center">' + 
                '<div class="card-body">'+
                '<h3 class="card-title">' + data[i] + '</h3>'+
                '<a href = "/caro" class="btn btn-outline-success number-room disabled" role="button">Phong da day</a>'+
                '</div></div>'
                );
            }
            else{
                $("#room").append('<div class="card text-center">' + 
                '<div class="card-body">'+
                '<h3 class="card-title">' + data[i] + '</h3>'+
                '<a href = "/caro" class="btn btn-outline-success number-room" role="button">Vao Phong</a>'+
                '</div></div>'
                );
            }    
        }
        number_room = document.getElementsByClassName('number-room');
        for(let j = 0; j<number_room.length; j++){
            number_room[j].onclick = () => {
                console.log("*"+data[j]+"*");
                socket.emit('join-room',data[j]);
            }
        }
    })
    $("#create_room").click(() => {
        socket.emit('create-room');
    })
    
})

socket.on('room-full', data => {
    var number_room = document.getElementsByClassName('number-room');
    for(let i in data.a){
        if(data.a[i] == data.nbr){
            console.log(data.a[i]);
            number_room[i].className += " disabled";
        }
    }
})
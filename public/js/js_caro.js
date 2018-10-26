
import {socket} from './module_socket';
    //create table  
    for(var i=0; i<33; i++){
        var tr = document.createElement("tr");
        var td = [];
        
        for(var j=0; j<33; j++){
            td[j] = document.createElement("td");
            td[j].innerHTML = "&nbsp;&nbsp;";
            tr.appendChild(td[j]);
        }
        document.getElementById("tab").appendChild(tr);
    }

    var x = document.getElementsByTagName("td");
    for(let k=0; k<x.length; k++){
        x[k].onclick = function(){
            if(this.value == undefined){
                this.innerHTML = "x";
                socket.emit('danh-x',{x:"x",k:k});
                
            }
        }
    }
$(document).ready(() => {
    socket.on('send-x', data => {
        var tdk = document.getElementsByTagName("td")[data.k];
        tdk.innerHTML = "";
        $("td")[data.k].append(data.x);
    })
})
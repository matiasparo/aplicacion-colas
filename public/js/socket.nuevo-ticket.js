//comando para establecer la conexion

var socket = io();

var label = $("#lblNuevoTicket");

socket.on("connect", function(){
    console.log("conectado al servidor!");
});


socket.on("disconect", function(){
    console.log("desconectado del servidor!");
});

socket.on('ticketStatus', function(data){
    label.text(data.actual);
});

$('button').on("click", null, function(){
    console.log("Siguete Ticket!");
    
    socket.emit('siguienteTicket', (siguiente)=>{
        label.text(siguiente);
        console.log(siguiente);
    });
});
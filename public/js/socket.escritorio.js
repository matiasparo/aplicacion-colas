//comando para establecer la conexion
var socket = io();

var searchParams = new URLSearchParams( window.location.search )

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}


var escritorio = searchParams.get('escritorio');
var label = $('small');
$("h1").text('Escritorio:'+escritorio);


$("button").on('click', function(){
    console.log(escritorio);
    socket.emit('atenderTicket',{escritorio:escritorio}, function(data){
        if(data.numero){
            label.text(data.numero);
        }
    });
});
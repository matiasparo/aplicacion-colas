const { io } = require('../server');
const {TicketControl} = require("../classes/ticket-control");

const ticketControl = new TicketControl();



io.on('connection', (client) => {
    console.log("usuario conectado");

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (callback) => {
        
        callback(ticketControl.siguient());        
    });

    client.emit('ticketStatus', {
        actual:ticketControl.getUltimoTicket(),
        ultimos4:ticketControl.getUltimosCuatro()
    });

    client.on('atenderTicket', (data, callback)=>{
        if(!data.escritorio){
            return callback({
                err:true,
                mensaje:'El escritorio es necesario'
            });

        }
        
        
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);        
            
        callback(atenderTicket);
        
        //emito ultimos 4
        client.broadcast.emit('ultimosCuatro', {
            ultimos4:ticketControl.getUltimosCuatro()
        });
        


    });

});
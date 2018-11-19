const fs = require("fs");


class Ticket {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if(data.hoy === this.hoy){
            //estoy en l mismo dia
            this.ultimo = data.ultimo;
            this.tickets = data.tickets; 
            this.ultimos4 = data.ultimos4;
        }else{
            //estoy en el dia siguiente
            this.reiniciarConteo();
        }


    }

    siguient(){
        this.ultimo ++;
        
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }

    getUltimosCuatro(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0){
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();//quito el primer elemento del array

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);//agrego un elemento al principio del array
        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1, 1);//elimino el ultimo elemento
        }

        this.grabarArchivo();

        console.log(this.ultimos4);
        return atenderTicket;

    }

    
    reiniciarConteo(){
        console.log("Se inicializo el sistema");
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = []; 
        this.grabarArchivo();
    }

    grabarArchivo(){
        let jsonData ={
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
        
    }

}

module.exports = {
    TicketControl
}
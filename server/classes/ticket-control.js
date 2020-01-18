const fs = require('fs');

/**
 * Creamos la clase de TicketControl
 */

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        // console.log(data);

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarContador();
        }
    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimoCuatros() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        console.log('escritorio ' + escritorio);

        if (this.tickets.length === 0) {
            return {
                "ok": false,
                "message": 'No hay ticket'
            };
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1) // borra el último
        }
        console.log('Ultimos 4:');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }



    reiniciarContador() {
        this.ultimo = 0;
        // console.log("Se ha reiniciado el contador");
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


module.exports = {
    TicketControl
}
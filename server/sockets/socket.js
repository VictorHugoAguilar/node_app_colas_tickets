const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        //     console.log(siguiente);
        callback(siguiente);
    });

    // emitir un evento 'estadoActual'
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimoCuatros()
    });

    client.on('atenderTicket', (data, callback) => {
        // Si no hay ticket
        if (!data.escritorio) {
            return callback({
                err: true,
                menssage: 'Escritorio necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // actualizar / notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimoCuatros()
        });

    });
});
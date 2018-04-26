const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    // Recibir el ticket
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        // console.log("Cual es el siguiente ticket", siguiente);
        callback(siguiente)
    })

    // Emitir evento estado actual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El mensaje es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // Actualizar / notificar cambios en los ultimos 4

    });

});
// Comando para establecer la conecxion

var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connnect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {

});

// On estado actual
socket.on('estadoActual', function(resp) {
    label.text(resp.actual)
})

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });

});
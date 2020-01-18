const ESCRITORIO = 'escritorio';

// Comando para establecer la conexion
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has(ESCRITORIO)) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

// Si viene el escritorio
var escritorio = searchParams.get(ESCRITORIO);
var label = $('small');

// console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);




$('button').on('click', function() {
    // Cuando presionamos el boton cambiamos el small por el ticket del servidor

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        console.log(resp);

        if (!resp.numero) {
            label.text(resp.message);
            return;
        } else {
            // Escribimos el ticket que estamos atendiendo
            label.text(resp.numero);
        }

    });

});
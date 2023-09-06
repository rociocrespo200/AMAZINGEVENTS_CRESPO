function cargarEventos() {
    for (let i = 0; i < data.events.length; i++) {
        const evento = data.events[i];
        if (data.currentDate <= evento.date) {
            crearEventos(evento);
        }
    }
};

cargarEventos();
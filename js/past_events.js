function cargarEventos() {
    const eventosPorFecha = [];
    for (let i = 0; i < eventos.length; i++) {
        const evento = eventos[i];
        if (currentDate > evento.date) {
            crearEventos(evento);
            eventosPorFecha.push(evento)
        }
    }
    filtrarEventos(eventosPorFecha);
};








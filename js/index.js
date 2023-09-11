function cargarEventos(){
    for(let evento of eventos){
        crearEventos(evento);
    }
    filtrarEventos(eventos);
};
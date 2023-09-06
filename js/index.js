function cargarEventos(){
    for(let evento of data.events){
        crearEventos(evento);
    }
};

cargarEventos();
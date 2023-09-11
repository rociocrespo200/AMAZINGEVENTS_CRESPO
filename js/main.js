//API
let apiURL = 'https://mindhub-xj03.onrender.com/api/amazing';

let eventos = [];
let currentDate = '';

async function getEventsData(){
    const respuesta = await fetch(apiURL);
    const data = await respuesta.json();
	currentDate = data.currentDate;
    eventos = data.events;

	if(document.title == "Details") crearDetails();
	else if (document.title == "Stats") generarTablas();
	else generarFiltros();
}

getEventsData();

//GENERAR FILTROS DINAMICAMENTE
function generarFiltros() {
	console.log(eventos);
	const categorias = [];

	//GUARDAR LAS CATEGORIAS DE LOS EVENTOS
	for (let i = 0; i < eventos.length; i++) {
		const evento = eventos[i];
		const category = evento.category;
		//SI LA CATEGORIA YA ESTA EN EL ARRAY NO VOLVER A GUARDARLA
		if (categorias.indexOf(category) === -1) {
			categorias.push(evento.category);
		}
	}

	const divFiltros = document.querySelector("#div_filtros_div");
	//RECORRO CATEGORY Y QENERO UN CHECKBOX POR CADA ELEMENTO
	for (let i = 0; i < categorias.length; i++) {
		const category = categorias[i];
		const label = document.createElement("label");
		label.innerHTML = `
            <input type="checkbox" name="${category}" class="filter-checkbox">
            <span>${category}</span>
        `;
		divFiltros.appendChild(label);
	}
	cargarEventos()
}


//CREAR EVENTOS
const contenedorEventos = document.querySelector("#section_cards");
let div_eventos = [];

function crearEventos(evento) {
	const divEvento = document.createElement("div");
	divEvento.classList.add("card");
	divEvento.id = evento._id;
	divEvento.innerHTML = `
            <img class="card-img-top w-100" id="img_card" src="${evento.image}" alt="${evento.name}">
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title">${evento.name}</h5>
                <p class="card-text">
                ${evento.description}
                </p>
                <div class="card_botones card_div_price_buton d-flex" >
                    <h5 class="price">${evento.price}.00$</h5>
                    <a href="./details.html?id=${evento._id}" class="btn" id="${evento._id}">View more ></a>
                </div>
            </div>
        `
	contenedorEventos.append(divEvento);
	div_eventos.push(divEvento);
}


const filtrosActivos = [];
let eventosFiltradoSearch = [];
let eventosFiltrados = [];

function filtrarEventos(eventos){
	document.querySelector("#form_busqueda").addEventListener('submit', (e) => {
		e.preventDefault();
		const inputSearch = document.querySelector("#input_search").value.toLowerCase(); // Obtener el valor del input y convertir a minúsculas
	
		let eventosFiltradoSearch = eventos.filter((evento) => evento.name.toLowerCase().includes(inputSearch) && (filtrosActivos.includes(evento.category) || filtrosActivos.length == 0))
		aplicarFiltros(eventosFiltradoSearch);
	});
	
	document.addEventListener('change', e => {
		console.log("------------- FILTROS -------------");
		if (e.target.classList.contains('filter-checkbox')) {  // --> los elementos con evento change y clase "filter-checkbox"
			console.log(e.target.name);
			console.log(filtrosActivos);
			if (filtrosActivos.includes(e.target.name) == false) {   // --> si el checkbox NO estaba activo
				let eventosFiltrados = (eventosFiltradoSearch.length != 0) ? eventosFiltradoSearch.filter((evento) => e.target.name == evento.category):
					eventos.filter((evento) => e.target.name == evento.category || filtrosActivos.includes(evento.category));
				aplicarFiltros(eventosFiltrados);
	
				filtrosActivos.push(e.target.name);
	
			} else {  // --> si el checkbox SI estaba activo
				filtrosActivos.splice(filtrosActivos.indexOf(e.target.name), 1);
	
				let eventosFiltrados = eventos.filter((evento) => filtrosActivos.includes(evento.category));
	
				if (filtrosActivos.length == 0) aplicarFiltros(eventos);
				else aplicarFiltros(eventosFiltrados);
	
			};
	
		}
	
	});
}

const footer = document.getElementById('footer');

function aplicarFiltros(eventos) {
	//console.log(eventos);
	contenedorEventos.innerHTML = "";
	//FUNCIONALIDAD DE LOS FILTROS
	console.log("------------- EVENTOS -------------");
	console.log(eventos); // --> divs generados dinamicamente
	for (const evento of eventos) {
		crearEventos(evento)
	}

	if(eventos.length === 0){
		contenedorEventos.innerHTML = ` 
		<p class="w-100 text-center" id="mensaje_eventos">
		No hay eventos disponibles con esas caracteristicas</p>
		`
	}

};


/*event listenner por fuera
en c/u llamar a una funcion que filtre con los dos criterio primero la busqueda
primero tengo una array de eventos filtrados y despues lo vuelvo a filtrar*/


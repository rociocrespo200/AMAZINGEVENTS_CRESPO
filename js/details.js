const contenedor = document.getElementById('card_details');

// URLSearchParams

const queryBusqueda = document.location.search;
const idEvento = new URLSearchParams(queryBusqueda).get("id");

const evento = data.events.find(evento => evento._id === idEvento);

function crearDetails(evento, contenedor){
    //desestructuracion
    const {name, image, date, description, place, capacity}  = evento;

    contenedor.innerHTML = `
    <div class="card" id="card_details2">
        <img id="card_details_img" src=${image} class="card-img-top" alt="...">
        <div class="card-body p-5 ">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">
                Date: ${date} <br>
                Place: ${place} - Capacity: ${capacity} <br>
                ${description}!! <br>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id deserunt, est vel odit commodi modi impedit possimus officiis fugit magni reprehenderit tenetur quam ipsa iure minus repellat nisi ut eligendi consequatur repellendus nobis earum accusantium. Ea molestiae doloremque reiciendis, quis est voluptas dicta possimus quibusdam dolore eligendi soluta ullam ratione.
            </p>
        </div>
    </div>
    `

}

crearDetails(evento, contenedor);
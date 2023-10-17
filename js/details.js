
function crearDetails(){
    const contenedor = document.getElementById('card_details');

    // URLSearchParams
    const queryBusqueda = document.location.search;
    const idEvento = new URLSearchParams(queryBusqueda).get("id");

    const evento = eventos.find(evento => evento._id == idEvento);
    
    contenedor.innerHTML = `
    <div class="card" id="card_details2">
        <img id="card_details_img" src=${evento.image} class="card-img-top" alt="...">
        <div class="card-body p-5 ">
            <h5 class="card-title">${evento.name}</h5>
            <p class="card-text">
                Date: ${evento.date} <br>
                Place: ${evento.place} - Capacity: ${evento.capacity} <br>
                ${evento.description}!! <br>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id deserunt, est vel odit commodi modi impedit possimus officiis fugit magni reprehenderit tenetur quam ipsa iure minus repellat nisi ut eligendi consequatur repellendus nobis earum accusantium. Ea molestiae doloremque reiciendis, quis est voluptas dicta possimus quibusdam dolore eligendi soluta ullam ratione.
            </p>
        </div>
    </div>
    `

}
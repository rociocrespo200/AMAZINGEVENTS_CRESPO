const contenedorEventos = document.querySelector("#section_cards");
const currentDate = "2023-08-25";

function cargarEventos() {
    for (let i = 0; i < data.events.length; i++) {
        const evento = data.events[i];
        console.log(currentDate > evento.date);
        if (currentDate < evento.date) {
            const divEvento = document.createElement("div");
            divEvento.classList.add("card");
            divEvento.innerHTML = `
                        <img class="card-img-top w-100 h-50"  id="img_card" src="${evento.image}" alt="${evento.name}">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h5 class="card-title">${evento.name}</h5>
                            <p class="card-text">
                            ${evento.description}
                            </p>
                            <div class="card_botones card_div_price_buton d-flex" >
                                <h5 class="price">${evento.price}.00$</h5>
                                <a href="./details.html" class="btn" id="${evento._id}">View more ></a>
                            </div>
                        </div>
                    `
            contenedorEventos.append(divEvento);
        }
    }
};

cargarEventos();
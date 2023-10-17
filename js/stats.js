let tabla1 = document.getElementById("tabla1");
let tabla2 = document.getElementById("tabla2");
let tabla3 = document.getElementById("tabla3");
const columnaUno = [];
const columnaTres = [];

function generarTablas(){
    //-------- TABLA 1 --------
    eventos.sort((evento2, evento1) => calcularPorcentaje(evento1) - calcularPorcentaje(evento2));
    for (let i = 0; i < eventos.length; i++) columnaUno.push(eventos[i].name + ": "+ calcularPorcentaje(eventos[i]).toFixed(2) +"%");

    concatenarElemento(columnaUno, 2, false);
    concatenarElemento(columnaUno, (columnaUno.length - 3), false);

    eventos.sort((evento1, evento2) => evento2.capacity - evento1.capacity);
    for (let i = 0; i < eventos.length; i++) columnaTres.push(eventos[i].name + ": "+ (eventos[i].capacity));
    concatenarElemento(columnaTres, 2,true, true);

    for (let i = 0; i < 3; i++)  cargarDatos(tabla1, columnaUno[i],  columnaUno[columnaUno.length - (i+1)],  columnaTres[i]);
    
    //-------- TABLA 2 Y 3 --------
    const categorias = [];
    for(let i = 0; i < eventos.length; i++) if(categorias.includes(eventos[i].category) == false) categorias.push(eventos[i].category);
    
    categorias.forEach(categoria => {
        cargarDatos(tabla2, categoria, calcularIngresos(categoria, false).toLocaleString('es', { style: 'currency', currency: 'USD' }), porcentajePorCategoria(categoria, false))
        cargarDatos(tabla3, categoria, calcularIngresos(categoria, true).toLocaleString('es', { style: 'currency', currency: 'USD' }), porcentajePorCategoria(categoria, true))
    });

}

function calcularPorcentaje(evento){
    if(evento.assistance == undefined) return (evento.estimate * 100) / evento.capacity;
    else return (evento.assistance * 100) / evento.capacity;
}

function calcularIngresos(categoria, validacion){
    let ingresos = 0;
    for (let i = 0; i < eventos.length; i++){
        let condicionFecha = (validacion) ? eventos[i].date < currentDate : eventos[i].date >= currentDate;
        if(eventos[i].category === categoria && condicionFecha) {
            if(eventos[i].assistance == undefined) ingresos += eventos[i].price * eventos[i].estimate;
            else ingresos += eventos[i].price * eventos[i].assistance;
        }
    }
    return (ingresos != 0) ? ingresos : "No hay eventos";
}

function porcentajePorCategoria(categoria, validacion){
    let sumaAsistencias = 0, sumaCapacidad = 0;

    for (let i = 0; i < eventos.length; i++){
        let condicionFecha = (validacion) ? eventos[i].date < currentDate : eventos[i].date >= currentDate;
        if(eventos[i].category === categoria && condicionFecha){    
            sumaCapacidad += parseInt(eventos[i].capacity)
            if(eventos[i].assistance == undefined) sumaAsistencias += eventos[i].estimate;
            else sumaAsistencias += eventos[i].assistance;
        }
    }
    return  (sumaCapacidad != 0) ? (sumaAsistencias * 100 / sumaCapacidad).toFixed(2).concat("%"): "No hay eventos";

}

function cargarDatos(tabla, columna1, columna2, columna3){
    let datos = document.createElement("tr");
        datos.innerHTML = `
        <td id=${tabla.id}_columna1>${columna1}</td>
        <td id=${tabla.id}_columna2>${columna2}</td>
        <td id=${tabla.id}_columna3>${columna3}</td>
        `
        tabla.appendChild(datos);
    
}

function concatenarElemento(array, columnaActual, capacity){
    if(columnaActual == 2){
        for (let i = columnaActual + 1; i < eventos.length; i++){
            if(capacity == true && eventos[columnaActual].capacity == eventos[i].capacity)
                array[columnaActual] = array[columnaActual].concat("<br>" + eventos[i].name + ": "+ (eventos[i].capacity))
            else if(capacity == false && calcularPorcentaje(eventos[columnaActual]) == calcularPorcentaje(eventos[i]))
                array[columnaActual] = array[columnaActual].concat("<br>" + eventos[i].name + ": "+ calcularPorcentaje(eventos[i]).toFixed(2) +"%")
        }
    }else for (let i = columnaActual - 1; i > 0; i--) if(calcularPorcentaje(eventos[columnaActual]) == calcularPorcentaje(eventos[i]))
                array[columnaActual] = array[columnaActual].concat("<br>" + eventos[i].name + ": "+ calcularPorcentaje(eventos[i]).toFixed(2) +"%")
}

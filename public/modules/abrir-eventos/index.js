
let char2Data = document.getElementById('char2Data');

let identificador = localStorage.getItem('id');
let id = localStorage.getItem('id');



/* OBTENER EVENTOS */
async function getEvent(id) {
    let response = await fetch('/api/buscar/' + id);
    let data = await response.json();
    return data;
}
/* FIN DE OBTENER EVENTOS */

document.addEventListener("DOMContentLoaded", async function renderEvents() {

    let event = await getEvent(id);

    let fecha = new Date(event.fecha);

    let options = {
        month: "short",
        day: "2-digit",
        year: "numeric"
    };
   
    console.log(event);
    document.getElementById('nameOfEvent').value = event.nombre;
    document.getElementById('eventImg').src = event.img;
    document.getElementById('characterOne').src = event.personajes[0].img;
    document.getElementById('characterTwo').src = event.personajes[1].img;
    document.getElementById('relatedCharacter1').innerText = event.personajes[0].nombre;
    document.getElementById('relatedCharacter2').innerText = event.personajes[1].nombre;
    document.getElementById('dateOfEvent').value = fecha.toLocaleDateString("en", options);
    document.getElementById('placeOnEart').value = event.pais;
    
    document.getElementById('eventDescription').innerText = event.descripcion;

 
    if (char2Data.childNodes[0].parentElement.innerText.length < 5) {
       char2Data.style.visibility = "hidden";
    }

});






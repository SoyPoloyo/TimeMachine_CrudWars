let table = document.getElementById('events-content');


/* OBTENER EVENTOS */
async function getEvents() {
    let response = await fetch('/api/eventos');
    let data = await response.json();
    return data;
}
/* FIN DE OBTENER EVENTOS */

async function deleteEvent(id) {



    var enlace = ('/api/eventos/' + id);
    const res = await fetch(enlace, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    });
    var data = await res.json();
    return data;


}//fin de deleteListarRutas 

/* RENDERIZAR LA LISTA AL INICIAR */
document.addEventListener("DOMContentLoaded", async function renderEvents() {

    let eventsList = await getEvents();

    const { eventos } = eventsList;
    /* 
       let d = new Date(eventos[0].fecha); */
    /* 
       let options = {
           month: "short",
         
       };
   
       console.log(
           d.getMonth() //en is language option, you may specify..
       );
       console.log(new Intl.DateTimeFormat('en-US', options).format(d)); */

    /*  const month = d.toLocaleString('default', { year: 'numeric' });
         console.log(month); */

    for (let evento of eventos) {
        let fecha = new Date(evento.fecha);

        let options = {
            month: "short",
            day: "2-digit",
            year: "numeric"
        };

        table.innerHTML += `
        <tr class="" id=${evento.uid}>
                <th scope="row">${evento.nombre} </th>
                <td>${fecha.toLocaleDateString("en", options)}</td>
                <td>${evento.ciudad}, ${evento.pais}</td>
                <td>
                  <button class="edit-button" onClick="editEvents('${evento.uid}')">Edit</button>
                  <button class="delete-button" onClick="deleteEvents('${evento.uid}')">
                    <img src="../../assets/img/close-button.svg" alt="">
                  </button>
                </td>
    
              </tr>
        `
    }





});
/* FIN DE LA LISTA AL INCIAR */



function buscar() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputBuscar");
    filter = input.value.toUpperCase();
    table = document.getElementById("contenidoTablaRutas");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

async function deleteEvents(id) {
    var response = await deleteEvent(id)

    swal({
        title: "Deleted Correctly",
        text: "Event deleted successfully",
        icon: "success",
        button: "Continuar",
      }); 

      setTimeout(() => {
        location.reload();
      
      }, 2000); 
    

}

const editEvents = (id) => {
    localStorage.setItem('id' , id);
    window.location = '../editar-eventos/index.html'
}

function addEvent() {
    console.log('funciona');
    location.href = '../agregar-eventos/index.html';

}

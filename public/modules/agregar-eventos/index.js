

let input = document.querySelectorAll('.inputfile');

let eventImg = document.getElementById('file');
let char1Img = document.getElementById('file2');
let char2Img = document.getElementById('file3');


Array.prototype.forEach.call(input, function (input) {
    
    let label = input.nextElementSibling;
    let labelVal = label.innerHTML;
    

    input.addEventListener('change', function (e) {

        let fileName = '';
        
        if (this.files && this.files.length > 1) {
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        }
        else {
           
            fileName = e.target.value.split('\\').pop();
            
            if (fileName){
               
                label.innerHTML = fileName;}
            else
                label.innerHTML = labelVal;
        }


    });
});


const guardarDatos = async () => {
    
    let name = document.getElementById('nameOfEvent').value;
    let character1 = document.getElementById('relatedCharacter1').value;
    let character2 = document.getElementById('relatedCharacter2').value;
    let dateEvent = document.getElementById('dateOfEvent').value;
    let place = document.getElementById('placeOnEart').value;
    let description = document.getElementById('eventDescription').value;
  

    let datos = [name, character1, character2, dateEvent, place,description];
    
    let aprobado = false;

    for (let dato of datos) {

        if (dato == '') {
            console.log(dato);
            aprobado = false;
           return  swal({
            title: "Registro Incorrecto",
            text: "Debe rellenar todos los campos",
            icon: "warning",
            button: "Continuar",
          });
        }

        aprobado = true;
      
       }
    
       let data = {
        "nombre" : name,
        "descripcion" : description,
        "pais" : place,
        "fecha" : dateEvent,
        "personajes" : [{
            "nombre": character1,
            "img": "" 
        },
        {
             "nombre":character2,
            "img": ""
        }],
        "img" : "" 
        }

     if (aprobado) {

        let identificador; 

          fetch = await fetch("/api/eventos", {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              }
    
          })
            .then(function(data) {
              return data.json();
            })
            .then(async function(res) {
              console.log(res.eventos);

              identificador = res.eventos.uid      
              
                if (eventImg.files[0]) {
                    let formData = new FormData();
                    formData.append("archivo", eventImg.files[0]);
  
                     fetch2 = await fetch("/api/uploads/eventos/" + identificador, {
                      body: formData,
                      method: "PUT",
              
                    })
                      .then(function(data) {
                        return data.json();
                      })
                      .then(function(res) {
                        console.log(res);
                        console.log('respuesta de la imagen 1');
                      })
                      .catch(function(err) {
                        console.log(err);
                      });
                } 

                if (char1Img.files[0]) {
                  let formData = new FormData();
                  formData.append("archivo", char1Img.files[0]);

                   fetch2 = await fetch("/api/uploads/char1/" + identificador, {
                    body: formData,
                    method: "PUT",
            
                  })
                    .then(function(data) {
                      return data.json();
                    })
                    .then(function(res) {
                      console.log(res);
                      console.log('respuesta de la imagen 1');
                    })
                    .catch(function(err) {
                      console.log(err);
                    });
              } 

              if (char2Img.files[0]) {
                let formData = new FormData();
                formData.append("archivo", char2Img.files[0]);

                 fetch2 = await fetch("/api/uploads/char1/" + identificador, {
                  body: formData,
                  method: "PUT",
          
                })
                  .then(function(data) {
                    return data.json();
                  })
                  .then(function(res) {
                    console.log(res);
                    console.log('respuesta de la imagen 1');
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
            } 
            
              swal({
              title: "Registro Correcto",
              text: "Evento Registrado Exitosamente",
              icon: "success",
              button: "Continuar",
            }); 

               setTimeout(() => {
              window.location.replace(
              "../listar-eventos/index.html"
            )
            }, 2000); 

            })
            .catch(function(err) {
              console.log(err);
            });

      
           
    
          
         
    
        
        
          
        }
}






/* else{
  swal({
    title: "Registro Correcto",
    text: "Evento Registrado Exitosamente",
    icon: "success",
    button: "Continuar",
  });  */

/*   setTimeout(() => {
    window.location.replace(
    "../listar-eventos/index.html"
  )
  }, 2000); */

/* } */
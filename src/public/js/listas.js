//Obtener las listas del usuario al momento de la carga de la página
$(document).ready(function(){
    cargarListas();
});

function cargarListas(){
    const iduser = $('#iduser').val();
    const url = 'https://elistio.herokuapp.com/api/' + iduser + '/listas';

    //Variable con la que se construiran los elementos html
    let html = '';

    //Realizar el llamado al API
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        success: function(response){
            if (response.responseCode == 1){
                console.log(response);
                if (response.data.length > 0){
                    response.data.forEach(element => {
                        html += '<tr>';
                        html += '<td>' + element.nombrelista + '</td>';
                        html += `<td><button class="btn btn-primary" onclick="verLista(${element.idlista})">Ver lista</button>`;
                        html += ` <button class="btn btn-danger" onclick="eliminarLista(${element.idlista})"><i class="fa fa-trash"></i></button>`;
                        html += '</tr>';
                    });
                }
                else{
                    html += '<tr><td colspan="2">Vaya! Parece que no tienes ninguna lista.</td></tr>';
                }
                $('#cuerpo').html(html);
            } else{
                alert(response.message);
                console.log(response);
            }
        },
        error: function(error){
            console.log(error);
            alert('Ha ocurrido un error al obtener la información');
        }
    });
}

function crearLista(){
    const iduser = $('#iduser').val();
    const nombrelista = $('#nuevalistaName').val();

    const crearUrl = 'https://elistio.herokuapp.com/api/listas/nueva/';
    
    const listaObj = {
        nombrelista: nombrelista,
        iduser: iduser
    };
    const lista = JSON.stringify(listaObj);
    $.ajax({
        type: 'POST',
        url: crearUrl,
        dataType: "json",
        data: lista,
        contentType: "application/json; charset=utf-8",
        success: function(response){
            if (response.responseCode == 1){
                console.log(response);
                cargarListas();
                $('#nuevalistaName').val('');
                
            } else{
                alert(response.message);
            }
        },
        error: function(error){
            console.log(error);
            alert('Ha ocurrido un error al obtener la información');
        }
    });
}


function eliminarLista(idlista){
    const url = 'https://elistio.herokuapp.com/api/listas/borrar/' + idlista;
    $.ajax({
        type: 'DELETE',
        url: url,
        dataType: "json",
        success: function(response){
            if (response.responseCode == 1){
                console.log(response);
                alert("Lista eliminada");
                cargarListas();
            } else{
                alert(response.message);
            }
        },
        error: function(error){
            console.log(error);
            alert('Ha ocurrido un error al establecer la comunicación con el servidor');
        }
    });
}

function verLista(idlista){
    let url = 'https://elistio.herokuapp.com/listas/' + idlista;
    
    $(location).attr('href', url);         
}
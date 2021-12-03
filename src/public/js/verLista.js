//Inicializar el valor del idlista
const idlista = $("#idlista").val();

//Cargar los items de la lista al inicio
$(document).ready(function(){
    cargarItems();
});

function cargarItems(){
    const iduser = $('#iduser').val();
    const url = 'http://localhost:3000/api/listas/' + idlista + '/items';

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
                    let countSelected = 0;
                    response.data.forEach(element => {
                        html += '<tr class="items">';
                        html += element.completado == 1 ? `<td> <input class="form-check-input" type="checkbox" checked onchange="cambiarEstado(${element.idelemento})"></td>`
                            : `<td> <input class="form-check-input" type="checkbox" onchange="cambiarEstado(${element.idelemento})"></td>`;
                        html += '<td class="itemNombre">' + element.item + '</td>';
                        html += `<td><button type="button" class="btn btn-secondary" id="btnEdit" onclick="editarItemText(${element.idelemento}, '${element.item}')"><i class="fa fa-edit"></i></button></td>`;
                        html += '</tr>';
                        
                        //contar cuantos items estan marcados como seleccionados
                        if (element.completado == 1){
                            countSelected++;
                        }
                    });

                    //Quitar el disabled si hay por lo menos uno chequeado
                    if (countSelected > 0){
                        $('#borrarSelec').prop('disabled', false);
                    }else{
                        $('#borrarSelec').prop('disabled', true);
                    }

                    //Habilitar el borrar todo porque la lista tiene items
                    $('#borrarTodo').prop('disabled', false);
                }
                else{
                    //Deshabilitar el botón de borrar todo
                    $('#borrarTodo').prop('disabled', true);
                    html += '<tr><td colspan="2">Vaya! Parece que la lista está vacía.</td></tr>';
                }
                //Insertar los elementos html
                $('#cuerpo').html(html);

                //Cargar el nombre de la lista
                cargarNombreLista();

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

//Si el elemento no está completado, se marca como completado y viceversa
function cambiarEstado(idelemento){
    const url = 'http://localhost:3000/api/items/' + idelemento + '/cambiarestado';
    $.ajax({
        type: 'PUT',
        url: url,
        dataType: "json",
        success: function(response){
            if (response.responseCode == 1){
                console.log(response);
                cargarItems();
            } else{
                alert(response.message);
            }
        },
        error: function(error){
            console.log(error);
            alert('Ha ocurrido un error al comunicarse con el servidor');
        }
    });
}

//Crear un nuevo item (o elemento)
function nuevoElemento(){
    const url = 'http://localhost:3000/api/items/nuevo';
    const itemText = $('#nuevo').val();
    const dataObj = {
        item: itemText,
        idlista: idlista
    };
    const data = JSON.stringify(dataObj);
    $.ajax({
        type: 'POST',
        url: url,
        dataType: "json",
        data: data,
        contentType: "application/json; charset=utf-8",
        success: function(response){
            if (response.responseCode == 1){
                console.log(response);
                cargarItems();
                $('#nuevo').val('');
                
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

//Borrar los elementos marcados como completados
function borrarSeleccionado(){
    const url = 'http://localhost:3000/api/' + idlista + '/items/borrar/completados';
    $.ajax({
        type: 'DELETE',
        url: url,
        dataType: "json",
        success: function(response){
            if (response.responseCode == 1){
                console.log(response);
                cargarItems();
            }
        },
        error: function(error){
            console.log(error);
            alert('Ha ocurrido un error al establecer la comunicación con el servidor');
        }
    });
}

//Eliminar todos los items de la lista
function borrarTodo(){
    const url = 'http://localhost:3000/api/' + idlista + '/items/borrar/todos';
    $.ajax({
        type: 'DELETE',
        url: url,
        dataType: "json",
        success: function(response){
            if (response.responseCode == 1){
                console.log(response);
                cargarItems();
                alert("Se eliminaron todos los elementos de la lista");
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


//Función para obtener el nombre de la lista actual
function cargarNombreLista(){
    const url = 'http://localhost:3000/api/listas/' + idlista;
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        success: function(response){
            if (response.responseCode == 1){
                $('#titulo').html(response.data[0].nombrelista);
                $('#nombreLista').html(response.data[0].nombrelista);
            } else{
                console.log(response);
            }
        }, error(error){
            console.log(error);
        }
    });
}

//Función para editar el nombre de un elemento
function editarItemText(idelemento, textoElemento){
    $('#editBlock').show();
    $('#editItem').val(textoElemento);
    $('#btnEdit').on('click', `editarItem(${idelemento})`);
    $('#editItem').focus();

    deshabilitarControles();
}

//Función para actualizar el nombre de un elemento
function editarItem(idelemento){
    $('#editItem').val('');
    $('#editBlock').hide();

    
    //habilitarControles();
}

function deshabilitarControles(){
   $('#controls').hide();
   $('#tablaItems').hide();
}

function habilitarControles(){
    $('#controls').show();
    $('#tablaItems').show();
}
//Inicializar el valor del idlista
const idlista = $("#idlista").val();

//Cargar los items de la lista al inicio
$(document).ready(function(){
    cargarItems();
});

function cargarItems(){
    const iduser = $('#iduser').val();
    const url = 'https://elistio.herokuapp.com/api/listas/' + idlista + '/items';

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
                    //Deshabilitar el bot??n de borrar todo
                    $('#borrarTodo').prop('disabled', true);
                    html += '<tr><td colspan="3">Vaya! Parece que la lista est?? vac??a.</td></tr>';
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
            alert('Ha ocurrido un error al obtener la informaci??n');
        }
    });
}

//Si el elemento no est?? completado, se marca como completado y viceversa
function cambiarEstado(idelemento){
    const url = 'https://elistio.herokuapp.com/api/items/' + idelemento + '/cambiarestado';
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
    const url = 'https://elistio.herokuapp.com/api/items/nuevo';
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
            alert('Ha ocurrido un error al obtener la informaci??n');
        }
    });
}

//Borrar los elementos marcados como completados
function borrarSeleccionado(){
    const url = 'https://elistio.herokuapp.com/api/' + idlista + '/items/borrar/completados';
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
            alert('Ha ocurrido un error al establecer la comunicaci??n con el servidor');
        }
    });
}

//Eliminar todos los items de la lista
function borrarTodo(){
    const url = 'https://elistio.herokuapp.com/api/' + idlista + '/items/borrar/todos';
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
            alert('Ha ocurrido un error al establecer la comunicaci??n con el servidor');
        }
    });
}


//Funci??n para obtener el nombre de la lista actual
function cargarNombreLista(){
    const url = 'https://elistio.herokuapp.com/api/listas/' + idlista;
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

//Funci??n para editar el nombre de un elemento
function editarItemText(idelemento, textoElemento){
    $('#editBlock').show();
    $('#editItem').val(textoElemento);
    $('#editItem').focus();
    $('#btnEdit').attr('onclick', 'editarItem(' + idelemento + ')');

    deshabilitarControles();
}

//Funci??n para actualizar el nombre de un elemento
function editarItem(idelemento){
    

        const url = 'https://elistio.herokuapp.com/api/items/' + idelemento + '/editar';
        const itemTxt = $('#editItem').val();
        const itemObj = {
            item: itemTxt
        };
        const data = JSON.stringify(itemObj);
        $.ajax({
            type: 'PUT',
            url: url,
            dataType: "json",
            data: data,
            contentType: "application/json; charset=utf-8",
            success: function(response){
                if (response.responseCode == 1){
                    $('#editBlock').hide();
                    $('#editItem').val('');
                    habilitarControles();
                    cargarItems();
                } else{
                    console.log(response);
                }
            }, error(error){
                console.log(error);
            }
        });
}

function deshabilitarControles(){
   $('#controls').hide();
   $('#tablaItems').hide();
}

function habilitarControles(){
    $('#controls').show();
    $('#tablaItems').show();
}
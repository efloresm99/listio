function verificarUsuario(){
    let username = $('#user').val();
    let url = 'https://mysql-efloresm.alwaysdata.net/api/users/' + username;

    //Realizar el llamado al API
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        success: function(response){
            if (response.responseCode == 1){
                const redirect = 'http://localhost:3000/' + response.data[0].iduser +'/mislistas';
                $(location).attr('href', redirect);
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
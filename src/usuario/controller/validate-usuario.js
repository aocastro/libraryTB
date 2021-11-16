$(document).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        assync: true,
        url: 'src/usuario/model/validate-usuario.php',
        success: function(dados) {
            Swal.fire({
                title: 'Library',
                text: dados.mensagem,
                icon: dados.tipo,
                confirmButtonText: 'OK'
            })

            if (dados.tipo === 'error') {
                $(location).attr('href', 'sistema.html');
            }
        }
    })
})
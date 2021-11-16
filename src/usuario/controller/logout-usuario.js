$(document).ready(function() {

    $('.logout').click(function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            url: 'src/usuario/model/logout-usuario.php',
            success: function(dados) {
                Swal.fire({
                    title: 'Library',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                if (dados.tipo === 'success') {
                    $(location).attr('href', 'sistema.html');
                }
            }
        })
    })
})
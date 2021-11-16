$(document).ready(function() {
    $('.btn-login').click(function(e) {
        e.preventDefault()

        let dados = $('#login').serialize()

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/usuario/model/login-usuario.php',
            success: function(dados) {
                if (dados.tipo === 'success') {
                    $(location).attr('href', 'adm.html');
                } else {
                    Swal.fire({
                        title: 'Library',
                        text: dados.mensagem,
                        icon: dados.tipo,
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })

})
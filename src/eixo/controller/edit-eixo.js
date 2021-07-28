$(document).ready(function() {

    $('#eixo').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        // Alterar as informações do modal para apresentação dos dados

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Edição de eixo tecnológico')

        let IDEIXO = `IDEIXO=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: IDEIXO,
            url: 'src/eixo/model/view-eixo.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/eixo/view/form-eixo.html', function() {
                        $('#NOME').val(dado.dados.NOME)
                        $('#IDEIXO').val(dado.dados.IDEIXO)
                    })
                    $('.btn-save').show()
                    $('.btn-save').removeAttr('data-operation')
                    $('#modal-eixo').modal('show')
                } else {
                    Swal.fire({ // Inicialização do SweetAlert
                        title: 'Library', // Título da janela SweetAler
                        text: dado.mensagem, // Mensagem retornada do microserviço
                        type: dado.tipo, // Tipo de retorno [success, info ou error]
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })
})
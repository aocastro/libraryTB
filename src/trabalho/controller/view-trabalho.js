$(document).ready(function() {

    $('#table-trabalho').on('click', 'button.btn-view', function(e) {

        e.preventDefault()

        // Alterar as informações do modal para apresentação dos dados

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Visualização de trabalho cadastrado')

        let IDTRABALHO = `IDTRABALHO=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: IDTRABALHO,
            url: 'src/trabalho/model/view-trabalho.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/trabalho/view/form-trabalho.html', function() {
                        $('#TITULO').val(dado.dados.TITULO)
                        $('#TITULO').attr('readonly', 'true')
                        $('#ANO').val(dado.dados.ANO)
                        $('#ANO').attr('readonly', 'true')
                        $('#NROPAGINAS').val(dado.dados.NROPAGINAS)
                        $('#NROPAGINAS').attr('readonly', 'true')
                        $('#RESUMO').val(dado.dados.RESUMO)
                        $('#RESUMO').attr('readonly', 'true')
                        $('#ORIENTADOR').val(dado.dados.ORIENTADOR)
                        $('#ORIENTADOR').attr('readonly', 'true')
                        $('#COORIENTADOR').val(dado.dados.COORIENTADOR)
                        $('#COORIENTADOR').attr('readonly', 'true')
                    })
                    $('.btn-save').hide()
                    $('#modal-trabalho').modal('show')
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
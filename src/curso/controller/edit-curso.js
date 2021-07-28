$(document).ready(function() {

    $('#table-curso').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        // Alterar as informações do modal para apresentação dos dados

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Edição de curso')

        let IDCURSO = `IDCURSO=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: IDCURSO,
            url: 'src/curso/model/view-curso.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/curso/view/form-curso.html', function() {
                        $('#NOME').val(dado.dados.NOME)
                        $('#IDCURSO').val(dado.dados.IDCURSO)
                        var eixo = dado.dados.EIXO_IDEIXO
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: 'src/eixo/model/all-eixo.php',
                            success: function(dados) {
                                for (const dado of dados) {
                                    if (dado.IDEIXO == eixo) {
                                        $('#EIXO_IDEIXO').append(`<option value="${dado.IDEIXO}">${dado.NOME}</option>`)
                                    }
                                }

                                // Criei um laço de repatição para aparecer os demais eixos existentes no banco de dados....
                                for (const eixoFind of dados) {
                                    if (eixoFind.IDEIXO != eixo) {
                                        $('#EIXO_IDEIXO').append(`<option value="${eixoFind.IDEIXO}">${eixoFind.NOME}</option>`)
                                    }
                                }

                            }
                        })
                    })
                    $('.btn-save').show()
                    $('#modal-curso').modal('show')
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
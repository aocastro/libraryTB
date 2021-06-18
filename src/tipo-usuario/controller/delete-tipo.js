$(document).ready(function() {

    $('#table-tipo').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let IDTIPO_USUARIO = `IDTIPO_USUARIO=${$(this).attr('id')}`

        Swal.fire({
            title: 'Library',
            text: 'Deseja realmente excluir esse registro?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result => {
            if (result.value) {

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    assync: true,
                    data: IDTIPO_USUARIO,
                    url: 'src/tipo-usuario/model/delete-tipo.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'Library',
                            text: dados.mensagem,
                            icon: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-tipo').DataTable().ajax.reload()
                    }
                })
            }
        }))

    })
})
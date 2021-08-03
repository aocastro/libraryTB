$(document).ready(function() {

    $('#table-usuario').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let IDUSUARIO = `IDUSUARIO=${$(this).attr('id')}`

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
                    data: IDUSUARIO,
                    url: 'src/usuario/model/delete-usuario.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'Library',
                            text: dados.mensagem,
                            icon: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-usuario').DataTable().ajax.reload()
                    }
                })
            }
        }))

    })
})
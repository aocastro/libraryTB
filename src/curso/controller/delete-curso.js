$(document).ready(function() {

    $('#table-curso').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let IDCURSO = `IDCURSO=${$(this).attr('id')}`

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
                    data: IDCURSO,
                    url: 'src/curso/model/delete-curso.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'Library',
                            text: dados.mensagem,
                            icon: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-curso').DataTable().ajax.reload()
                    }
                })
            }
        }))

    })
})
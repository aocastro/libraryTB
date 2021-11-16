$(document).ready(function() {

    $('#table-trabalho').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let IDTRABALHO = `IDTRABALHO=${$(this).attr('id')}`

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
                    data: IDTRABALHO,
                    url: 'src/trabalho/model/delete-trabalho.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'Library',
                            text: dados.mensagem,
                            icon: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-trabalho').DataTable().ajax.reload()
                    }
                })
            }
        }))

    })
})
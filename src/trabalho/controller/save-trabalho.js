$(document).ready(function() {
    $('.btn-save').click(function(e) {
        e.preventDefault()

        url = "src/trabalho/model/save-trabalho.php"

        var formData = new FormData(document.getElementById("form-trabalho"))

        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            mimeType: "multipart/form-data",
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            success: function(dados) {
                Swal.fire({
                    title: 'Library',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-trabalho').modal('hide')
                    // $('#table-trabalho').DataTable().ajax.reload()
            }
        })
    })
})
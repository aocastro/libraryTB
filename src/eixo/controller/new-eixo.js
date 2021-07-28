$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo eixo tecnológico')

        $('.modal-body').load('src/eixo/view/form-eixo.html')

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-eixo').modal('show')
    })
})
function selectAuthor() {

    $('.alert').click(function(e) {
        e.preventDefault()
        let id = $(this).attr('id')
        let nome = $(this).attr('data-name')
        $('#result').append(`
            <div class="alert alert-primary">${nome}</div>
            <input type="hidden" name="USUARIO_IDUSUARIO[]" value="${id}" />
        `)
        $('#' + id).hide()
    })

}

$(document).ready(function() {

    $('#AUTOR').keyup(function(e) {
        e.preventDefault()

        let NOME = `NOME=${$(this).val()}`

        if ($(this).val().length >= 3) {

            $('#autores').empty()

            $.ajax({
                dataType: 'json',
                type: 'POST',
                assync: true,
                data: NOME,
                url: 'src/usuario/model/find-usuario.php',
                success: function(dados) {
                    for (const dado of dados) {
                        $('#autores').append(`<div id="${dado.IDUSUARIO}" data-name="${dado.NOME}" class="alert alert-secondary">${dado.NOME}</div>`)
                    }
                    selectAuthor()
                }
            })

        } else {
            $('#autores').empty()
        }

    })
})
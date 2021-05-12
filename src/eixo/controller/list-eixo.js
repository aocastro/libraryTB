$(document).ready(function() {
    $('#eixo').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/eixo/model/list-eixo.php",
            "type": "POST"
        },
        "columns": [{
                "data": 'IDEIXO',
                "className": 'text-center'
            },
            {
                "data": 'NOME',
                "className": 'text-center'
            },
            {
                "data": 'IDEIXO',
                "orderable": false,
                "searchable": false,
                "className": 'text-center',
                "render": function(data, type, row, meta) {
                    return `
                    <button id="${data}" class="btn btn-info btn-sm btn-view">VER</button>
                    <button id="${data}" class="btn btn-primary btn-sm btn-edit">EDITAR</button>
                    <button id="${data}" class="btn btn-danger btn-sm btn-delete">EXCLUIR</button>
                    `
                }
            }
        ]
    })
})
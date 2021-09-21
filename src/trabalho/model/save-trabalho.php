<?php
    /******
     * Upload de imagens
     ******/

    //  echo $_FILES[ 'archive' ][ 'name' ];

    // verifica se foi enviado um arquivo
    if ( isset( $_FILES[ 'ARQUIVO' ][ 'name' ] ) && $_FILES[ 'ARQUIVO' ][ 'error' ] == 0 ) {
        // echo 'Você enviou o arquivo: <strong>' . $_FILES[ 'archive' ][ 'name' ] . '</strong><br />';
        // echo 'Este arquivo é do tipo: <strong > ' . $_FILES[ 'archive' ][ 'type' ] . ' </strong ><br />';
        // echo 'Temporáriamente foi salvo em: <strong>' . $_FILES[ 'archive' ][ 'tmp_name' ] . '</strong><br />';
        // echo 'Seu tamanho é: <strong>' . $_FILES[ 'archive' ][ 'size' ] . '</strong> Bytes<br /><br />';

        $arquivo_tmp = $_FILES[ 'ARQUIVO' ][ 'tmp_name' ];
        $nome = $_FILES[ 'ARQUIVO' ][ 'name' ];

        // Pega a extensão
        $extensao = pathinfo ( $nome, PATHINFO_EXTENSION );

        // Converte a extensão para minúsculo
        $extensao = strtolower ( $extensao );

        // Somente imagens, .jpg;.jpeg;.gif;.png
        // Aqui eu enfileiro as extensões permitidas e separo por ';'
        // Isso serve apenas para eu poder pesquisar dentro desta String
        if ( strstr ( '.pdf', $extensao ) ) {
            // Cria um nome único para esta imagem
            // Evita que duplique as imagens no servidor.
            // Evita nomes com acentos, espaços e caracteres não alfanuméricos
            $novoNome = uniqid ( time () ) . '.' . $extensao;

            // Concatena a pasta com o nome
            $destino = 'arquivos/' . $novoNome;

            // tenta mover o arquivo para o destino
            if ( @move_uploaded_file ( $arquivo_tmp, $destino ) ) {
                $retorno = array ('mensagem' => 'Arquivo salvo com sucesso em : ' . $destino);
                // include '../conexao.php';
                // $documents = utf8_decode($_POST['nameDocuments']);
                // $sqlInsert = mysqli_query($conecta, "INSERT INTO lions_documents (nameDocuments, fileDocuments) VALUES ('".$documents."', '".$novoNome."')");
                // header('Location: ../../sistema/returnSuccess.php');
            }
            else
                $retorno = array ('mensagem' => 'Erro ao salvar o arquivo. Aparentemente você não tem permissão de escrita.');
        }
        else
            $retorno = array ('mensagem' => 'Você poderá enviar apenas arquivos "*.PDF"');
    }
    else
        $retorno = array ('mensagem' => 'Você não enviou nenhum arquivo!');


    echo json_encode($retorno);
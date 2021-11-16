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
                
                // Scripts de persistência no banco de dados .....
                // Obter a nossa conexão com o banco de dados
                include('../../conexao/conn.php');

                // Obter os dados enviados do formulário via $_REQUEST
                $requestData = $_REQUEST;

                // Verificação de campo obrigatórios do formulário
                if(empty($requestData['TITULO'])){
                    // Caso a variável venha vazia eu gero um retorno de erro do mesmo
                    $dados = array(
                        "tipo" => 'error',
                        "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
                    );
                } else {
                    // Caso não exista campo em vazio, vamos gerar a requisição
                    $ID = isset($requestData['IDTRABALHO']) ? $requestData['IDTRABALHO'] : '';
                    $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';

                    // Verifica se é para cadastra um nvo registro
                    if($operacao == 'insert'){
                        // Prepara o comando INSERT para ser executado
                        try{
                            $stmt = $pdo->prepare('INSERT INTO TRABALHO (TITULO, ANO, NROPAGINAS, RESUMO, ORIENTADOR, COORIENTADOR, ARQUIVO) VALUES (:a, :b, :c, :d, :e, :f, :g)');
                            $stmt->execute(array(
                                ':a' => utf8_decode($requestData['TITULO']),
                                ':b' => $requestData['ANO'],
                                ':c' => $requestData['NROPAGINAS'],
                                ':d' => utf8_decode($requestData['RESUMO']),
                                ':e' => utf8_decode($requestData['ORIENTADOR']),
                                ':f' => utf8_decode($requestData['COORIENTADOR']),
                                ':g' => $novoNome
                            ));

                            // Início da busca dos último cadastro efetivado
                            $sql = $pdo->query("SELECT * FROM TRABALHO ORDER BY IDTRABALHO DESC LIMIT 1");
                
                            while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
                                $IDTRABALHO = $resultado['IDTRABALHO'];
                            }

                            $indice = count(array_filter($requestData['USUARIO_IDUSUARIO']));

                            for($i=0; $i < $indice; $i++) {
                                $stmt = $pdo->prepare('INSERT INTO AUTOR (TRABALHO_IDTRABALHO, USUARIO_IDUSUARIO) VALUES (:a, :b)');
                                $stmt->execute(array(
                                    ':a' => $IDTRABALHO,
                                    ':b' => $requestData['USUARIO_IDUSUARIO'][$i]
                                ));
                            }

                            $retorno = array(
                                "tipo" => 'success',
                                "mensagem" => 'Trabalho cadastrado com sucesso.'
                            );
                        } catch(PDOException $e) {
                            $retorno = array(
                                "tipo" => 'error',
                                "mensagem" => 'Não foi possível efetuar o cadastro do trabalho.'
                            );
                        }
                    } else {
                        // Se minha variável operação estiver vazia então devo gerar os scripts de update
                        try{
                            $stmt = $pdo->prepare('UPDATE TRABALHO SET TITULO = :a, ANO = :b, NROPAGINAS = :c, RESUMO = :d, ORIENTADOR = :e, COORIENTADOR = :f, ARQUIVO = :g WHERE IDTRABALHO = :id');
                            $stmt->execute(array(
                                ':id' => $ID,
                                ':a' => utf8_decode($requestData['TITULO']),
                                ':b' => $requestData['ANO'],
                                ':c' => $requestData['NROPAGINAS'],
                                ':d' => utf8_decode($requestData['RESUMO']),
                                ':e' => utf8_decode($requestData['ORIENTADOR']),
                                ':f' => utf8_decode($requestData['COORIENTADOR']),
                                ':g' => $requestData['ARQUIVO']
                            ));

                            $retorno = array(
                                "tipo" => 'success',
                                "mensagem" => 'Trabalho atualizado com sucesso.'
                            );
                        } catch (PDOException $e) {
                            $retorno = array(
                                "tipo" => 'error',
                                "mensagem" => 'Não foi possível efetuar o alteração do trabalho.'
                            );
                        }
                    }
                }

                // $retorno = array ('mensagem' => 'Arquivo salvo com sucesso em : ' . $destino);
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
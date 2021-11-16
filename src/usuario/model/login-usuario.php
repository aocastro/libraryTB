<?php

    include('../../conexao/conn.php');

    $sql = $pdo->query("SELECT *, count(IDUSUARIO) as achou FROM USUARIO WHERE EMAIL = '".$_REQUEST['EMAIL']."' AND SENHA = '".md5($_REQUEST['SENHA'])."'");

    while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
        if($resultado['achou'] == 1){
            session_start();
            $_SESSION['IDUSUARIO'] = $resultado['IDUSUARIO'];
            $_SESSION['NOME'] = $resultado['NOME'];
            $dados = array(
                'tipo' => 'success',
                'mensagem' => 'Login correto!'
            );
        }else{
            $dados = array(
                'tipo' => 'error',
                'mensagem' => 'Nome de usuário ou senha errado.'
            );
        }
    }

    echo json_encode($dados);
<?php

    session_start();

    if(!isset($_SESSION['IDUSUARIO']) && !isset($_SESSION['NOME'])){
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Você não está autenticado para utilizar o sistema, por favor realize o login.'
        );
    }else{
        $dados = array(
            'tipo' => 'success',
            'mensagem' => 'Seja bem vindo, '.$_SESSION['NOME'].' ao sistema de Biblioteca.'
        );
    }

    echo json_encode($dados);
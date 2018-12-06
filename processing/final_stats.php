<?php

require '../_header.php';

if(!empty($_POST)) {
    if(isset($_POST['start']) && isset($_POST['fun_id']) && isset($_POST['article_ids'])) {
        $fun_id = intval($_POST['fun_id']);
        try{
           $datetime = DateTime::createFromFormat("Y-m-d h:i:s",$_POST['start']);
        } catch(Exception $e){
            echo "Le format de la date et de l'heure est invalide";
            die();
        }

        $final_stats = $payutcClient->getTraderStats(array('obj_ids' => $_POST['article_ids'], 'fun_id' => $_POST['fun_id'], 'start' => $_POST['start']));

        echo json_encode($final_stats);
    }
}
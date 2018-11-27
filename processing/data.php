<?php

require '../_header.php';

// $article_ids = json_decode($_POST['article_ids']);
// $sales_number = $payutcClient->getNbSell(array('obj_id' => $article_ids[0], 'fun_id' => $_POST['fondation'], 'start' => $_POST['heure']));
// var_dump($sales_number);
// die();


// var_dump($_SERVER['HTTP_X_REQUESTED_WITH']);
// var_dump($_SERVER);
// die();

// if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    if(!empty($_POST)) {
        if(isset($_POST['heure']) && isset($_POST['fondation']) && isset($_POST['article_ids'])) {
            $fun_id = intval($_POST['fondation']);
            try{
               $datetime = DateTime::createFromFormat("Y-m-d h:i:s",$_POST['heure']);
            } catch(Exception $e){
                echo "Le format de la date et de l'heure est invalide";
                die();
            }
            $articles_sold = $payutcClient->getNbSells(array('obj_ids' => $_POST['article_ids'], 'fun_id' => $fun_id, 'start' => $_POST['heure']));

            $purchased_ids = array_column($articles_sold, 'obj_id');
            $article_ids = json_decode($_POST['article_ids']);

            header("Content-Type: text/xml");
            echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>";

            echo "<root>";
            foreach($articles_sold as $article_sold) {
                echo "<row id='$article_sold->obj_id' nombre_vendu='$article_sold->nb' />";
            }
            foreach($article_ids as $article_id) {
                if(!in_array($article_id, $purchased_ids)) {
                    echo "<row id='$article_id' nombre_vendu='0' />";
                }
            }
            echo "</root>";
        } else {
            echo "Les paramètres nécessaires ne sont pas transmis";
        }
    } else {
        echo "Rien n'est transmis en POST";
    }
// } else {
//     echo 'Cette page doit être appelée en Ajax';
// }

?>
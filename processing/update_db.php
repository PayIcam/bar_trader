<?php

require '../_header.php';

if(!empty($_POST)) {
    if(isset($_POST['articles'])) {
        $payutcClient->setPrice(array('articles' => json_encode($_POST['articles']), 'fun_id' => $_SESSION['fun_id']));
    } else {
        echo "Les paramètres nécessaires ne sont pas transmis";
    }
} else {
    echo "Rien n'est transmis en GET";
}

?>
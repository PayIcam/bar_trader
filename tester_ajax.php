<?php

session_start(); 

$id = $_GET['id'];

include('data/config.php');

$connexion = mysqli_connect($bdd_url, $bdd_login, $bdd_password, $bdd_database);

$requete = "INSERT INTO t_transaction_tra VALUES (null, NOW(), NOW(), 1, 1, null, 8, 2, 'V', null, null, null, '', null)";

$resultat = mysqli_query($connexion, $requete);

$tra_id = mysqli_insert_id($connexion);

$requete = "INSERT INTO t_purchase_pur VALUES (null, $tra_id, $id, 1, 10, null, 10, 0, 0, 0)";

$resultat = mysqli_query($connexion, $requete);

?>
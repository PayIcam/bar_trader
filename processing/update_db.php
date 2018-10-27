<?php

session_start();

$prix = $_GET['prix'];
$id = $_GET['id'];

include('config.php');

$connexion = mysqli_connect($bdd_url, $bdd_login, $bdd_password, $bdd_database);

$requete = "UPDATE t_price_pri SET pri_credit = $prix WHERE t_price_pri.obj_id = $id";

$resultat = mysqli_query($connexion, $requete);

?>
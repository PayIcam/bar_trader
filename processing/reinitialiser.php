<?php
session_start();

include('../config.php');

try
{
  $bdd = new PDO('mysql:host='.$bdd_url.';dbname='.$bdd_database.';charset=utf8', $bdd_login, $bdd_password);
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}

$tableau_id_bière=[43 => 200,8 => 200,4 => 100,31 => 200,360 => 200,721 => 200,32 => 150,258 => 200,541 => 200,22 => 200,19 => 200,534 => 200];

foreach ($tableau_id_bière as $id => $price) {
	$reinitialisation_prix = $bdd -> prepare('UPDATE t_price_pri SET pri_credit=? WHERE obj_id=?');
	$reinitialisation_prix -> execute(array($price,$id));
}
header('Location: admin_trader.php');
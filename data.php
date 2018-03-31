<?php

session_start(); 

$datetime = $_SESSION['datetime'];

header("Content-Type: text/xml");
echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>";

echo "<root>";

include('data/config.php');

$connexion = mysqli_connect($bdd_url, $bdd_login, $bdd_password, $bdd_database);

$requete = "SELECT t_object_obj.obj_id AS id, SUM(t_purchase_pur.pur_qte) AS nombre_vendu FROM t_object_obj JOIN t_price_pri, t_purchase_pur, t_transaction_tra WHERE t_object_obj.obj_id = t_price_pri.obj_id AND t_object_obj.obj_id = t_purchase_pur.obj_id AND t_transaction_tra.tra_id = t_purchase_pur.tra_id AND obj_removed=0 AND t_object_obj.fun_id=2 AND tra_date > '$datetime' GROUP BY t_object_obj.obj_id ORDER BY nombre_vendu DESC";

$resultat = mysqli_query($connexion, $requete);

$lines = 0;

while ($row = $resultat->fetch_assoc()) {
	$id = $row['id'];
	$nombre_vendu = $row['nombre_vendu'];

	echo "<row id='$id' nombre_vendu='$nombre_vendu' />";

	$lines ++;
}


echo "</root>";

?>
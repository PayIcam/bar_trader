<?php
session_start(); 

include('../data/config.php');

try
{
  $bdd = new PDO('mysql:host='.$bdd_url.';dbname='.$bdd_database.';charset=utf8', $bdd_login, $bdd_password);
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}

var_dump($_GET);

if(!empty($_GET))
{
	foreach ($_GET as $key => $value)
	{
		if(!is_null($value) &&  $value!="")
		{
			?> <script type="text/javascript">localStorage.setItem(<?php echo("'".$key."',".$value)?>);</script>
				<p>le script a bien été modifié</p>
			<?php
		}
	}
}



?>

<!DOCTYPE html>
<html>
  <head>
    <title>traider</title>
    <meta name="description" content="essai de l'algo trader"/>
  </head>
  <body>
  	<form action="admin_trader" >
  		<ul>
			<li><label>tps de rafraichissement</label><input name="tps_rafraichissement" type="number"></li>
			<li><label>interval de prix</label><input type="number" name="var_prix"></li>
			<li><label>variation du prix lors d'une bulle</label><input type="number" name="var_bulle"></li>
			<li><label>variation du prix lors d'un crash</label><input type="number" name="var_crash"></li>
			<li><label>bénéfice maximale</label><input type="number" name="benef_max"></li>
			<li><label>temps de cooldown</label><input type="number" name="tps_cooldown"></li>
		</ul>
		<input type="submit" value="prendre en compte">
  	</form>
  	<a href="reinitialiser.php"><input type = "button" value="reinitialiser"></a>
  </body>
</html>
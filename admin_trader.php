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
/*
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
*/
?>
<!DOCTYPE html>
<html>
  <head>
    <title>traider</title>
    <meta name="description" content="essai de l'algo trader"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
  </head>
  <body>

<div class="container" style="height: 40px; text-align: center;">
	<h5>Administration Tradder Bar </h5>
</div>

<div class="container-fluid">

<div class="row" >

<div class="col-sm" >
<div class="card" >
<div class="card border-dark" >
  <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
  <div class="card-header" style="text-align: center">
	<h4>Variables Trader</h4>
  </div>

  <div class="card-body" style="margin: auto; font-size: auto ">
    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
		<form>
		  <div class="form-group row" style="margin-bottom: 3px">
		    <label for="option1" class="col-md col-form-label">Temps de rafraichissement</label>
		    <div class="col-md" style="margin: auto">
		    <input type="number" name="tps_rafraichissement" class="form-control" id="option1" placeholder="..." style="height: auto; width: 100px">
			</div>
		    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
		  </div>
		  <div class="form-group row" style="margin-bottom: 3px">
		    <label for="option2" class="col-md col-form-label">Intervale de prix</label>
		    <div class="col-md" style="margin: auto">
		    <input type="number" name="var_prix" class="form-control" id="option2" placeholder="..." style="height: auto; width: 100px">
			</div>
		  </div>
		  <div class="form-group row" style="margin-bottom: 3px">
			<label for="option3" class="col-md col-form-label">Variation du prix lors d'une Bulle</label>
			<div class="col-md" style="margin: auto">
			<input type="number" name="var_bulle" class="form-control" id="option3" placeholder="..." style="height: auto; width: 100px">
			</div>
		  </div>
		  <div class="form-group row" style="margin-bottom: 3px">
			<label for="option4" class="col-md col-form-label">Variation du prix lors d'un Krach</label>
			<div class="col-md" style="margin: auto">
			<input type="number" name="var_crash" class="form-control" id="option4" placeholder="..." style="height: auto; width: 100px">
			</div>
		  </div>
		  <div class="form-group row" style="margin-bottom: 3px">
			<label for="option5" class="col-md col-form-label">Bénéfice maximal</label>
			<div class="col-md" style="margin: auto">
			<input type="number" name="benef_max" class="form-control" id="option5" placeholder="..." style="height: auto; width: 100px">
		  	</div>
		  </div>
		  <div class="form-group row" >
			<label for="option6" class="col-md col-form-label">Temps de cooldown</label>
			<div class="col-md" style="margin: auto">
			<input type="number" name="tps_cooldown" class="form-control" id="option6" placeholder="..." style="height: auto; width: 100px">
		  	</div>
		  </div>
  </div>
		  <!-- <div class="form-check">
		    <input type="checkbox" class="form-check-input" id="exampleCheck1">
		    <label class="form-check-label" for="exampleCheck1">Check me out</label>
		  </div> -->
		  <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
		
		<div class="card-footer">
			<div class="row">
				<div class="col-" style="margin: auto">
					<input type="submit" class="btn btn-primary" value="Prendre en compte">
		</form>
				</div>
		
				<div class="col-" style="margin: auto">
					<a href="reinitialiser.php"><input type = "button" value="Réinitialiser" class="btn btn-primary"></a>
				</div>
			</div>
		</div>
</div> <!-- /CARD-BORDER-DARK -->
</div>
</div>

<div class="col-lg-">
	<div style="margin-bottom: 5px;">
	<button type="button" class="btn btn-primary">Pause</button>
	<button type="button" class="btn btn-secondary">Réinitialiser</button>
	<button type="button" class="btn btn-success">Relancer</button>
	<button type="button" class="btn btn-danger">Stop</button>
	<!-- <button type="button" class="btn btn-warning">Warning</button> -->
	<!-- <button type="button" class="btn btn-info">Info</button> -->
	<!-- Example single danger button -->
	<div class="btn-group">
  		<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    	Infos
  		</button>
	  <div class="dropdown-menu">
	    <a class="dropdown-item" href="#">Bière 1</a>
	    <a class="dropdown-item" href="#">Bière 2</a>
	    <a class="dropdown-item" href="#">Bière 3</a>
	    <div class="dropdown-divider"></div>
	    <a class="dropdown-item" href="#">Bière 4</a>
	  </div>
	</div>
	<!-- <button type="button" class="btn btn-light">Light</button> -->
	<!-- <button type="button" class="btn btn-dark">Dark</button> -->
	<!-- <button type="button" class="btn btn-link">Link</button> -->
	</div>
   <table id="tableau" class="table table-borderless table-sm">
   </table>
  
</div>
</div>

<div class="row">
</div>

  </div>	<!-- /CONTAINER -->
  
<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

        <script type="text/javascript" src="../js/oXHR.js"></script>
        <script type="text/javascript">
          
          function update(){
            var tableau = document.getElementById("tableau");

            while (tableau.firstChild) {
              tableau.removeChild(tableau.firstChild);
            }

            var total_benefice = 0;
            var total_recette = 0;

            var head = tableau.createTHead();
            var ligne = head.insertRow(0);
            ligne.insertCell(0).outerHTML = "<td>Nom</td>";
            ligne.insertCell(1).outerHTML = "<td>Prix vente calculé</td>";
            ligne.insertCell(2).outerHTML = "<td>Prix vente réel</td>";
            ligne.insertCell(3).outerHTML = "<td>Prix initial</td>";
            ligne.insertCell(4).outerHTML = "<td>Prix revient</td>";
            ligne.insertCell(5).outerHTML = "<td>Prix min</td>";
            ligne.insertCell(6).outerHTML = "<td>Nb ventes</td>";
            ligne.insertCell(7).outerHTML = "<td>Recette</td>";
            ligne.insertCell(8).outerHTML = "<td>Bénéfice</td>";

            var head = tableau.createTBody();

            var boissons = JSON.parse(localStorage.getItem('boissons'));

            for(var id in boissons){
                var ligne = head.insertRow(-1);
                for(var e in boissons[id]){
                    var cellule = ligne.insertCell(-1);
                    cellule.outerHTML = "<th>" + boissons[id][e] + "</th>";
                }
                var cellule = ligne.insertCell(-1);
                var benefice = boissons[id]['recette'] - boissons[id]['prix_revient'] * boissons[id]['nb_ventes'];
                cellule.outerHTML = "<th>" + benefice + "</th>";

                total_recette += boissons[id]['recette'];
                total_benefice += benefice;
            }

            var ligne = head.insertRow(-1);
            var cellule = ligne.insertCell(-1);
            var cellule = ligne.insertCell(-1);
            var cellule = ligne.insertCell(-1);
            var cellule = ligne.insertCell(-1);
            var cellule = ligne.insertCell(-1);
            var cellule = ligne.insertCell(-1);
            var cellule = ligne.insertCell(-1);
            var cellule = ligne.insertCell(-1);
            cellule.outerHTML = "<th>" + total_recette + "</th>";
            var cellule = ligne.insertCell(-1);
            cellule.outerHTML = "<th>" + total_benefice + "</th>";
          }
          
          setInterval(update, 100);
        </script>

  </body>
</html>
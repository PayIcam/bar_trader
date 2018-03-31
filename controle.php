<?php 

session_start();

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Controle</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    </head>

    <body>
        <div class="container">
            <div class="row">
                    <table id="tableau" class="table table-borderless table-sm">
                    </table>
            </div>
        </div>

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
            ligne.insertCell(5).outerHTML = "<td>Nb ventes</td>";
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
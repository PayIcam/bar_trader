<?php 

session_start();

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Controle</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="css/style.css" />
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript">
          google.charts.load('current', {packages: ['corechart']});
          google.charts.setOnLoadCallback(drawChart);
        </script>       

    </head>

    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="navigation col-2">
                    <div class="text-center">
                        <img src="img/logo_big.png" class="logo_menu">
                    </div>
                    <button type="button" id="button0" onclick="changer_affichage(0);">Contrôle général</button>
                    <button type="button" id="button1" onclick="changer_affichage(1);">Tableau des prix</button>
                    <button type="button" id="button2" onclick="changer_affichage(2);">Variables trader</button>
                    <button type="button" id="button3" onclick="changer_affichage(3);">Infos sur les bières</button>

                    <div style="position: absolute; bottom: 5px; width: 100%; text-align: center;">
                        <button type="button" class="btn btn-primary"><i class="material-icons">pause</i></button>
                        <button type="button" class="btn btn-secondary"><i class="material-icons">replay</i></button>
                        <button type="button" class="btn btn-success"><i class="material-icons">play_arrow</i></button>
                        <button type="button" class="btn btn-danger"><i class="material-icons">stop</i></button>
                    </div>
                </div>

                <div class="contenu col-10">
                    <div id="titre">
                        <h4 id="titre_texte" style="line-height: 60px;">Titre</h4>
                    </div>
                    <div id="fenetre">
                        <div id="affichage0" class="affichage">
                            Affichage0
                              <div id="chart_div"></div>
                              <script type="text/javascript" >
                                  
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawLineColors);

function drawLineColors() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Bière1');
      data.addColumn('number', 'Bière2');

      data.addRows([
        [0, 0, 0],    
        [1, 10, 5],   
        [2, 23, 15],  
        [3, 17, 9],   
        [4, 18, 10],  
        [5, 9, 5],
        [6, 11, 3],   
        [7, 27, 19],  
        [8, 33, 25],  
        [9, 40, 32],  
        [10, 32, 24],
      ]);

      var options = {
        hAxis: {
          title: 'Temps'
        },
        vAxis: {
          title: 'Ventes'
        },
        colors: ['#a52714', '#097138']
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
                              </script>
                              
      

                        </div>

                        <div id="affichage1" class="affichage">
                            <table id="tableau" class="table table-borderless table-sm"></table>
                        </div>

                        <div id="affichage2" class="affichage">
                            <form>
                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label for="option1" class="col-md col-form-label">Temps de rafraichissement<i class="material-icons">create</i></label>
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
                                
                                <div class="row">
                                    <input type="submit" class="btn btn-primary" value="Prendre en compte">
                                </div>
                            </form>
                        </div>

                        <div id="affichage3" class="affichage">
                            Affichage3
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

        <script type="text/javascript">

            // Change le numéro de la page affichée
            function changer_affichage(numero)
            {
                tout_cacher();
                document.getElementById('affichage'+numero).style.display = 'block';
                document.getElementById('button'+numero).className = 'button_nav_active';
                document.getElementById('titre_texte').innerHTML = document.getElementById('button'+numero).innerHTML;
            }

            // Cache toutes les pages
            function tout_cacher()
            {
                var i = 0;
                while(true)
                {
                    if(document.getElementById('affichage'+i) == null)
                    {
                        break;
                    }
                    else
                    {
                        document.getElementById('affichage'+i).style.display = 'none';
                        document.getElementById('button'+i).className = 'button_nav_unactive';
                    }
                    i++;
                }
            }

            // Par défaut, affichage de la page 0
            changer_affichage(0);




















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
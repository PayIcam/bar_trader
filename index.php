<?php 

session_start(); 
$fondation = 2;

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Trader - Accueil</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="shortcut icon" type="image/x-icon" href="img/logo.png" />
    </head>

    <body>
        <form>

            <img src="img/logo_big.png" style="position: fixed; width: 15vh; left: 10px; top: 20px;">

            <!-- Div qui contient le premier formulaire de choix des boissons du trader -->
            <br>
            <div class="container">
                <div class="card border-dark">
                    <div class="card-header text-center">
                        <h4>Choisissez les bières à prendre en compte :</h4>
                    </div>

                    <div class="card-body">
                        <?php

                        include('data/config.php');

                        // Connexion à la BDD
                        $connexion = mysqli_connect($bdd_url, $bdd_login, $bdd_password, $bdd_database);

                        $requete = "SELECT t_object_obj.obj_name AS nom, t_object_obj.obj_id AS id, t_price_pri.pri_credit AS prix FROM t_object_obj JOIN t_price_pri WHERE t_object_obj.obj_id = t_price_pri.obj_id AND obj_removed=0 AND t_object_obj.fun_id=" . $fondation;
                        $resultat = mysqli_query($connexion, $requete);

                        // On affiche tous les articles dispos de la fondation
                        while ($row = $resultat->fetch_assoc()) {
                            $nom = utf8_encode($row['nom']);
                            $id = $row['id'];
                            $prix = $row['prix'];

                            echo '
                             <input type="checkbox" value="' . $id . '" id="check' . $id . '" prix="' . $prix . '" nom="' . $nom . '" onclick="selectionArticle(this);">
                          <label for="check' . $id . '">' . $nom . '</label>';
                        }

                        ?>

                        <br>
                        <table class="table table-bordered table-sm" id="choix_prix">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nom</th>
                                    <th>Prix initial</th>
                                    <th>Prix minimal</th>
                                    <th>Prix de revient</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <br>
            <div class="container">
                <div class="card border-dark">
                    <div class="card-header text-center">
                        <h4>Paramètres généraux :</h4>
                    </div>

                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-1"></div>
                        <div class="col-sm-3">
                            <label>Benefice Max (centimes)</label>
                        </div>
                        <div class="col-sm-2"></div>
                        <div class="col-sm-3">
                            <label>Benefice Min (centimes)</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-1"></div>
                        <div class="col-sm-3">
                            <input type="number" class="form-control" id="benefice_max" placeholder="Benefice Max">
                        </div>
                        <div class="col-sm-2"></div>
                        <div class="col-sm-3">
                            <input type="number" class="form-control" id="benefice_min" placeholder="Benefice Min">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-1"></div>
                        <div class="col-sm-5">
                            <label for="exampleInputEmail1">Heure de début</label>
                        </div>
                        <div class="col-sm-4">
                            <label for="exampleInputEmail1">Heure de fin</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-1"></div>
                        <div class="col-sm-2">
                            <input type="date" class="form-control" id="date_debut">
                        </div>
                        <div class="col-sm-2">
                            <input type="time" class="form-control" id="heure_debut">
                        </div>
                        <div class="col-sm-1"></div>
                        <div class="col-sm-2">
                            <input type="date" class="form-control" id="date_fin">
                        </div>
                        <div class="col-sm-2">
                            <input type="time" class="form-control" id="heure_fin">
                        </div>
                    </div>
                    <br>
                    <div class="form-group text-center">
                        <input type="button" value="Démarrer le trader" onclick="appui_bouton();">
                    </div>
                </div>
            </div>
        </form>
    <br>
    </body>

    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript">
        localStorage.setItem('fondation', <?php echo $fondation ?>);
    </script>
</html>
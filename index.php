<?php

require '_header.php';
$fondation = 2;
$_SESSION['fun_id'] = $fondation;
$products = $payutcClient->getProducts(array('params[service]' => 'Mozart', 'params[fun_ids]' => json_encode([$fondation])));

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Trader - Accueil</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="shortcut icon" type="image/x-icon" href="img/logo.png" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    </head>

    <body>
        <form>
            <!-- Div qui contient le premier formulaire de choix des boissons du trader -->
            <br>
            <div class="row">
                <div class="col-1" style="padding-right: 0;">
                    <img src="img/logo_big.png" style="width: 100%;">
                </div>
                <div class="col-10" style="padding: 0;">
                    <div class="card border-dark">
                        <div class="card-header text-center">
                            <h4>Choisissez les bières à prendre en compte :</h4>
                        </div>

                        <div class="card-body">
                            <div class="row">

                            <?php
                            $i=0;
                            foreach($products as $product) {
                                if($i%6==0) {
                                    echo '</div><div class="row">';
                                }
                                echo '<div class="col-sm-2"><label for="check' . $product->id . '">' . $product->name . '</label>
                                <input type="checkbox" value="' . $product->id . '" id="check' . $product->id . '" prix="' . $product->price . '" name="' . $product->name . '" onclick="selectionArticle(this);"></div>';

                                $i++;
                            } ?>
                            </div>

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
            </div>

            <br>
            <div class="row">
                <div class="col-1" style="padding-right: 0;">
                </div>
                <div class="col-10" style="padding: 0;">
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

                        <!-- <div id="trader_dates">
                            <div class='form-group' class="col-sm-3">
                                <label for="open_trader">Ouverture du trader:</label>
                                <div class='input-group date' id='open_trader_div'>
                                    <input type='text' class="form-control" name="open_trader" id="open_trader" required>
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                </div>
                            </div>
                            <div class='form-group' class="col-sm-3">
                                <label for="close_trader">Fin du trader:</label>
                                <div class='input-group date' id='close_trader_div'>
                                    <input type='text' class="form-control" name="close_trader" id="close_trader" required>
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                                </div>
                            </div>
                        </div> -->

                        <br>
                        <div class="form-group text-center">
                            <input type="button" value="Démarrer le trader" onclick="appui_bouton();">
                        </div>
                    </div>
                </div>
            </div>
        </form>
    <br>
    </body>
    <!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"> </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>

    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript">
        localStorage.setItem('fondation', <?php echo $fondation ?>);
    </script> -->

    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript">
        localStorage.setItem('fondation', <?php echo $fondation ?>);
    </script>
</html>



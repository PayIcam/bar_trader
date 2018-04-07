<?php 

session_start();

$_SESSION['val0'] = 0;
$_SESSION['val1'] = 0;
$_SESSION['val2'] = 0;
$_SESSION['val3'] = 0;
$_SESSION['val4'] = 0;
$_SESSION['val5'] = 0;
$_SESSION['val6'] = 0;
$_SESSION['val7'] = 0;
$_SESSION['val8'] = 0;
$_SESSION['val9'] = 0;
$_SESSION['val10'] = 0;
$_SESSION['val11'] = 0;
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Trader - Administration</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="css/style.css" />
        <link rel="shortcut icon" type="image/x-icon" href="img/logo.png" />

        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    </head>

    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="navigation col-2">
                    <div class="text-center">
                        <img src="img/logo_big.png" class="logo_menu">
                    </div>
                    <button type="button" id="button0" onclick="changer_affichage(0);">Graphique des prix</button>
                    <button type="button" id="button1" onclick="changer_affichage(1);">Graphique des ventes</button>
                    <button type="button" id="button2" onclick="changer_affichage(2);">Tableau des prix</button>
                    <button type="button" id="button3" onclick="changer_affichage(3);">Variables trader</button>
                    <button type="button" id="button4" onclick="changer_affichage(4);">Statistiques</button>
                    <button type="button" id="button5" onclick="changer_affichage(5);">Evènements</button>

                    <div style="position: absolute; bottom: 5px; width: 100%; text-align: center;">
                        <button id="demarrer" type="button" class="btn btn-success" onclick="demarrer();"><i class="material-icons">play_arrow</i></button>
                        <button id="pause" type="button" class="btn btn-outline-primary" onclick="pause();"><i class="material-icons">pause</i></button>
                        <button id="reinitialiser" type="button" class="btn btn-outline-secondary" onclick="reinitialiser();"><i class="material-icons">replay</i></button>
                        <button id="stop" type="button" class="btn btn-outline-danger" onclick="stop();"><i class="material-icons">stop</i></button>
                    </div>
                </div>

                <div class="contenu col-10">
                    <div id="titre" style="display: flex; justify-content: space-between;">
                        <h4 id="titre_texte" style="line-height: 60px;">Titre</h4>
                        <h4 id="compteur_texte" style="line-height: 60px;">--</h4>
                    </div>
                    <div id="fenetre">
                        <div id="affichage0" class="affichage">
                            <div id="g1" style="height: 500px; width: 100%;"></div>
                        </div>

                        <div id="affichage1" class="affichage">
                            <div id="g2" style="height: 500px; width: 100%;"></div>
                        </div>

                        <div id="affichage2" class="affichage">
                            <table id="tableau" class="table table-borderless table-sm"></table>
                        </div>

                        <div id="affichage3" class="affichage">
                            <form>
                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Temps de rafraichissement (s)</label>
                                    <div class="col-md-1" id="val_valeur0">-</div>
                                    <button type="button" id="mod_valeur0" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(0);" style="margin-right: 5px;"><i class="material-icons" style="font-size: 15px">mode_edit</i></button>
                                    <button type="button" id="con_valeur0" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(0);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">check</i></button>
                                    <button type="button" id="ann_valeur0" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(0);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">clear</i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Intervale de prix</label>
                                    <div class="col-md-1" id="val_valeur1">-</div>
                                    <button type="button" id="mod_valeur1" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(1);" style="margin-right: 5px;"><i class="material-icons" style="font-size: 15px">mode_edit</i></button>
                                    <button type="button" id="con_valeur1" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(1);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">check</i></button>
                                    <button type="button" id="ann_valeur1" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(1);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">clear</i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Variation du prix lors d'une Bulle</label>
                                    <div class="col-md-1" id="val_valeur2">-</div>
                                    <button type="button" id="mod_valeur2" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(2);" style="margin-right: 5px;"><i class="material-icons" style="font-size: 15px">mode_edit</i></button>
                                    <button type="button" id="con_valeur2" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(2);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">check</i></button>
                                    <button type="button" id="ann_valeur2" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(2);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">clear</i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Variation du prix lors d'un Krach</label>
                                    <div class="col-md-1" id="val_valeur3">-</div>
                                    <button type="button" id="mod_valeur3" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(3);" style="margin-right: 5px;"><i class="material-icons" style="font-size: 15px">mode_edit</i></button>
                                    <button type="button" id="con_valeur3" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(3);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">check</i></button>
                                    <button type="button" id="ann_valeur3" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(3);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">clear</i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Bénéfice maximal</label>
                                    <div class="col-md-1" id="val_valeur4">-</div>
                                    <button type="button" id="mod_valeur4" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(4);" style="margin-right: 5px;"><i class="material-icons" style="font-size: 15px">mode_edit</i></button>
                                    <button type="button" id="con_valeur4" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(4);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">check</i></button>
                                    <button type="button" id="ann_valeur4" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(4);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">clear</i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Bénéfice minimal</label>
                                    <div class="col-md-1" id="val_valeur5">-</div>
                                    <button type="button" id="mod_valeur5" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(5);" style="margin-right: 5px;"><i class="material-icons" style="font-size: 15px">mode_edit</i></button>
                                    <button type="button" id="con_valeur5" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(5);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">check</i></button>
                                    <button type="button" id="ann_valeur5" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(5);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">clear</i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Temps de cooldown</label>
                                    <div class="col-md-1" id="val_valeur6">-</div>
                                    <button type="button" id="mod_valeur6" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(6);" style="margin-right: 5px;"><i class="material-icons" style="font-size: 15px">mode_edit</i></button>
                                    <button type="button" id="con_valeur6" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(6);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">check</i></button>
                                    <button type="button" id="ann_valeur6" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(6);" style="margin-right: 5px; display: none;"><i class="material-icons" style="font-size: 15px">clear</i></button>
                                </div>
                            </form>
                        </div>

                        <div id="affichage4" class="affichage">
                            Affichage3
                        </div>

                        <div id="affichage5" class="affichage">
                            <h3 id="affichage_cooldown">Cooldown : -</h3>
                            <div class="row">
                                <div class="col-6">
                                    <button class="button button_image" onclick="forcer_evenement = 1;">
                                        <h3>Déclenche l'explosion de la bulle !</h3>
                                        <img src="img/video1.jpg" style="width: 100%; height: 50vh;">
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button class="button button_image" onclick="forcer_evenement = 2;">
                                        <h3>Déclenche un krach boursier !</h3>
                                        <img src="img/video2.jpg" style="width: 100%; height: 50vh;">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

        <script type="text/javascript" src="js/oXHR.js"></script>
        <script type="text/javascript" src="js/administration.js"></script>
    </body>
</html>
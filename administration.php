<?php

require '_header.php';

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Trader - Administration</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="css/style.css" />
        <link rel="shortcut icon" type="image/x-icon" href="img/logo.png" />
        <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>

        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    </head>

    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="navigation" style="position: relative; width: 215px;">
                    <div class="text-center">
                        <img src="img/logo_big.png" class="logo_menu">
                    </div>
                    <button type="button" id="button0" onclick="changer_affichage(0);"><i class="fas fa-tasks"></i>  Variables générales</button>
                    <button type="button" id="button1" onclick="changer_affichage(1);"><i class="fas fa-chart-line"></i>    Graphique des prix</button>
                    <button type="button" id="button2" onclick="changer_affichage(2);"><i class="fas fa-chart-line"></i>    Graphique des ventes</button>
                    <button type="button" id="button3" onclick="changer_affichage(3);"><i class="far fa-money-bill-alt"></i>   Tableau des prix</button>
                    <button type="button" id="button4" onclick="changer_affichage(4);"><i class="fas fa-chart-bar"></i>  Statistiques</button>
                    <button type="button" id="button5" onclick="changer_affichage(5);"><i class="far fa-calendar-check"></i>  Evènements</button>
                    <button type="button" id="button6" onclick="changer_affichage(6);"><i class="fas fa-chart-area"></i>  Graphique des bénéfices</button>
                    <button type="button" id="button7" onclick="changer_affichage(7);"><i class="fas fa-bug"></i>  Débug</button>

                    <div style="position: absolute; bottom: 5px; width: 100%; text-align: center;">
                        <button id="demarrer" type="button" class="btn btn-outline-success" onclick="demarrer();" style="font-size: 1.5em;"><i class="fas fa-play"></i></button>
                        <button id="pause" type="button" class="btn btn-primary" onclick="pause();" style="font-size: 1.5em;"><i class="fas fa-pause"></i></button>
                        <button id="reinitialiser" type="button" class="btn btn-outline-secondary" onclick="reinitialiser();" style="font-size: 1.5em;"><i class="fas fa-undo-alt"></i></button>
                        <button id="stop" type="button" class="btn btn-outline-danger" onclick="stop();" style="font-size: 1.5em;"><i class="fas fa-stop"></i></button>
                    </div>
                </div>

                <div class="contenu col">
                    <div id="titre" style="display: flex; justify-content: space-between;">
                        <h4 id="titre_texte" style="line-height: 60px;">Titre</h4>
                        <div style="">
                            <h5 id="compteur_texte">--</h5>
                            <a target="_blank" href="ecran.php"><h5 id="compteur_ecran" style="line-height: 60px; font-size: 50px;"><i class="fas fa-desktop"></i></h5></a>
                        </div>
                    </div>
                    <div id="fenetre">
                        <div id="affichage0" class="affichage">
                            <form onSubmit="return false;">
                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Temps de rafraichissement</label>
                                    <div class="col-md-2" id="val_valeur0">-</div>
                                    <button type="button" id="mod_valeur0" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(0);" style="margin-right: 5px;"><i class="fas fa-pencil-alt"></i></button>
                                    <button type="button" id="con_valeur0" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(0);" style="margin-right: 5px; display: none;"><i class="fas fa-check"></i></button>
                                    <button type="button" id="ann_valeur0" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(0);" style="margin-right: 5px; display: none;"><i class="fas fa-times"></i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Variation du prix lors de l'achat</label>
                                    <div class="col-md-2" id="val_valeur1">-</div>
                                    <button type="button" id="mod_valeur1" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(1);" style="margin-right: 5px;"><i class="fas fa-pencil-alt"></i></button>
                                    <button type="button" id="con_valeur1" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(1);" style="margin-right: 5px; display: none;"><i class="fas fa-check"></i></button>
                                    <button type="button" id="ann_valeur1" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(1);" style="margin-right: 5px; display: none;"><i class="fas fa-times"></i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Variation du prix lors d'une Bulle</label>
                                    <div class="col-md-2" id="val_valeur2">-</div>
                                    <button type="button" id="mod_valeur2" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(2);" style="margin-right: 5px;"><i class="fas fa-pencil-alt"></i></button>
                                    <button type="button" id="con_valeur2" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(2);" style="margin-right: 5px; display: none;"><i class="fas fa-check"></i></button>
                                    <button type="button" id="ann_valeur2" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(2);" style="margin-right: 5px; display: none;"><i class="fas fa-times"></i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Variation du prix lors d'un Krach</label>
                                    <div class="col-md-2" id="val_valeur3">-</div>
                                    <button type="button" id="mod_valeur3" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(3);" style="margin-right: 5px;"><i class="fas fa-pencil-alt"></i></button>
                                    <button type="button" id="con_valeur3" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(3);" style="margin-right: 5px; display: none;"><i class="fas fa-check"></i></button>
                                    <button type="button" id="ann_valeur3" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(3);" style="margin-right: 5px; display: none;"><i class="fas fa-times"></i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Bénéfice maximal</label>
                                    <div class="col-md-2" id="val_valeur4">-</div>
                                    <button type="button" id="mod_valeur4" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(4);" style="margin-right: 5px;"><i class="fas fa-pencil-alt"></i></button>
                                    <button type="button" id="con_valeur4" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(4);" style="margin-right: 5px; display: none;"><i class="fas fa-check"></i></button>
                                    <button type="button" id="ann_valeur4" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(4);" style="margin-right: 5px; display: none;"><i class="fas fa-times"></i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Bénéfice minimal</label>
                                    <div class="col-md-2" id="val_valeur5">-</div>
                                    <button type="button" id="mod_valeur5" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(5);" style="margin-right: 5px;"><i class="fas fa-pencil-alt"></i></button>
                                    <button type="button" id="con_valeur5" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(5);" style="margin-right: 5px; display: none;"><i class="fas fa-check"></i></button>
                                    <button type="button" id="ann_valeur5" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(5);" style="margin-right: 5px; display: none;"><i class="fas fa-times"></i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Temps de cooldown pour les événements</label>
                                    <div class="col-md-2" id="val_valeur6">-</div>
                                    <button type="button" id="mod_valeur6" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(6);" style="margin-right: 5px;"><i class="fas fa-pencil-alt"></i></button>
                                    <button type="button" id="con_valeur6" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(6);" style="margin-right: 5px; display: none;"><i class="fas fa-check"></i></button>
                                    <button type="button" id="ann_valeur6" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(6);" style="margin-right: 5px; display: none;"><i class="fas fa-times"></i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Temps pour la mise à jour des graphiques</label>
                                    <div class="col-md-2" id="val_valeur7">-</div>
                                    <button type="button" id="mod_valeur7" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(7);" style="margin-right: 5px;"><i class="fas fa-pencil-alt"></i></button>
                                    <button type="button" id="con_valeur7" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(7);" style="margin-right: 5px; display: none;"><i class="fas fa-check"></i></button>
                                    <button type="button" id="ann_valeur7" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(7);" style="margin-right: 5px; display: none;"><i class="fas fa-times"></i></button>
                                </div>

                                <div class="form-group row" style="margin-bottom: 3px">
                                    <label class="col-md-4">Message sur la banière</label>
                                    <div class="col-md-5" id="val_valeur8">-</div>
                                    <button type="button" id="mod_valeur8" class="col-md-1 btn btn-primary btn-sm" onclick="modifier_variable(8);" style="margin-right: 5px;"><i class="fas fa-pencil-alt"></i></button>
                                    <button type="button" id="con_valeur8" class="col-md-1 btn btn-primary btn-sm" onclick="confirmer_variable(8);" style="margin-right: 5px; display: none;"><i class="fas fa-check"></i></button>
                                    <button type="button" id="ann_valeur8" class="col-md-1 btn btn-primary btn-sm" onclick="annuler_variable(8);" style="margin-right: 5px; display: none;"><i class="fas fa-times"></i></button>
                                </div>
                            </form>
                        </div>

                        <div id="affichage1" class="affichage">
                            <div id="g1" style="height: 500px; width: 100%;"></div>
                        </div>

                        <div id="affichage2" class="affichage">
                            <div id="g2" style="height: 500px; width: 100%;"></div>
                        </div>

                        <div id="affichage3" class="affichage">
                            <table id="tableau" class="table table-borderless table-sm"></table>
                        </div>

                        <div id="affichage4" class="affichage">
                            <div class="row">
                                <div class="col-md-5"><h5>Recettes de la soirée :</h5></div>
                                <div class="col-md-5"><h5 id="stat0">--</h5></div>
                            </div>
                            <div class="row">
                                <div class="col-md-5"><h5>Nombre de bières vendues :</h5></div>
                                <div class="col-md-5"><h5 id="stat1">--</h5></div>
                            </div>
                            <div class="row">
                                <div class="col-md-5"><h5>Bière la plus vendue :</h5></div>
                                <div class="col-md-5"><h5 id="stat2">--</h5></div>
                            </div>
                            <div class="row">
                                <div class="col-md-5"><h5>Bénéfices :</h5></div>
                                <div class="col-md-5"><h5 id="stat3">--</h5></div>
                            </div>
                            <div class="row">
                                <div class="col-md-5"><h5>Moyenne de ventes :</h5></div>
                                <div class="col-md-5"><h5 id="stat4">--</h5></div>
                            </div>
                            <div class="row">
                                <div class="col-md-5"><h5>Nombre de krash boursier :</h5></div>
                                <div class="col-md-5"><h5 id="stat5">--</h5></div>
                            </div>
                            <div class="row">
                                <div class="col-md-5"><h5>Nombre d'explosion de la bulle :</h5></div>
                                <div class="col-md-5"><h5 id="stat6">--</h5></div>
                            </div>
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

                        <div id="affichage6" class="affichage">
                            <h3 id="benef_tps_reel">Bénéfice en temps réel : </h3>
                            <div id="g3" style="height: 500px; width: 100%;"></div>
                        </div>

                        <div id="affichage7" class="affichage">
                            <div class="row">
                                <div class="col-2">heure_debut =</div>
                                <div class="col-8" id="debug0">--</div>
                            </div>
                            <div class="row">
                                <div class="col-2">heure_fin =</div>
                                <div class="col-8" id="debug1">--</div>
                            </div>
                            <div class="row">
                                <div class="col-2">new Date() =</div>
                                <div class="col-8" id="debug2">--</div>
                            </div>
                            <div class="row">
                                <div class="col-2">temps_absolu =</div>
                                <div class="col-4" id="debug3">--</div>
                            </div>
                            <div class="row">
                                <div class="col-2">temps_absolu_total =</div>
                                <div class="col-4" id="debug4">--</div>
                            </div>
                            <div class="row">
                                <div class="col-2">on_pause =</div>
                                <div class="col-4" id="debug5">--</div>
                            </div>
                            <div class="row">
                                <div class="col-2">finished =</div>
                                <div class="col-4" id="debug6">--</div>
                            </div>
                            <div class="row">
                                <div class="col-2">fondation =</div>
                                <div class="col-4" id="debug7">--</div>
                            </div>
                            <div class="row">
                                <div class="col-2">video_en_cours =</div>
                                <div class="col-4" id="debug8">--</div>
                            </div>
                            <div class="row">
                                <div class="col-2">maj_graphiques =</div>
                                <div class="col-4" id="debug9">--</div>
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
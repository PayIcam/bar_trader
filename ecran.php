<?php

require '_header.php';

// date_default_timezone_set('Europe/Paris');
// --- La setlocale() fonctionnne pour strftime mais pas pour DateTime->format()
// setlocale(LC_TIME, 'fr_FR.utf8','fra');// OK
// strftime("jourEnLettres jour moisEnLettres annee") de la date courante
// $date = strftime("%A %d %B %Y");  $heure = strftime("%H:%M:%S");

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Trader - Ecran</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="css/ecran.css" />
        <link rel="shortcut icon" type="image/x-icon" href="img/logo.png" />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
         <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    </head>

    <body>

        <div class="container-fluid" style="width:80%" id="final_stats">
            <h2 class="resultats text-center"><span id="participants"></span> participants au Bar Trader ! <br>
            <span id="bieres"></span> bières achetées !</h2>
            <br>
            <table class="table table-bordered text-center" id="users">
                <thead>
                    <tr>
                        <th>Rang</th>
                        <th>Meilleures économies</th>
                        <th>Meilleures affaires</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <table class="table table-bordered text-center" id="articles">
                <thead>
                    <tr>
                        <th>Article</th>
                        <th>Nombre de ventes</th>
                        <th>Prix moyen</th>
                        <th>Plus haute vente</th>
                        <th>Plus basse vente</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
                <tfoot>

                </tfoot>
            </table>
        </div>

        <div id="to_hide">
            <h1 id="banniere">BIENVENUE AU BAR TRADER DE L'ICAM</h1>
            <h3 id="decompte"></h3>

            <div id="tableau" class="container" style="padding: 5px">

                <br><br><br>
                <div class="row">

                    <div class="col-">
                        <table id="tableau_gauche" class="table table-borderless">
                          <tbody>
                            <tr >
                              <td id="n0"></td>
                              <td id="p0"></td>
                              <td id="q0"></td>
                            </tr>
                            <tr >
                              <td id="n1"></td>
                              <td id="p1"></td>
                              <td id="q1"></td>
                            </tr>
                            <tr>
                              <td id="n2"></td>
                              <td id="p2"></td>
                              <td id="q2"></td>
                            </tr>
                            <tr>
                              <td id="n3"></td>
                              <td id="p3"></td>
                              <td id="q3"></td>
                            </tr>
                            <tr>
                              <td id="n4"></td>
                              <td id="p4"></td>
                              <td id="q4"></td>
                            </tr>
                            <tr>
                              <td id="n5"></td>
                              <td id="p5"></td>
                              <td id="q5"></td>
                            </tr>
                            <tr>
                              <td id="n6"></td>
                              <td id="p6"></td>
                              <td id="q6"></td>
                            </tr>
                            <tr>
                              <td id="n7"></td>
                              <td id="p7"></td>
                              <td id="q7"></td>
                            </tr>
                            <tr>
                              <td id="n19"></td>
                              <td id="p19"></td>
                              <td id="q19"></td>
                            </tr>
                            <tr>
                              <td id="n20"></td>
                              <td id="p20"></td>
                              <td id="q20"></td>
                            </tr>
                            <tr>
                              <td id="n21"></td>
                              <td id="p21"></td>
                              <td id="q21"></td>
                            </tr>
                            <tr>
                              <td id="n22"></td>
                              <td id="p22"></td>
                              <td id="q22"></td>
                            </tr>
                            <tr>
                              <td id="n23"></td>
                              <td id="p23"></td>
                              <td id="q23"></td>
                            </tr>
                            <tr>
                              <td id="n24"></td>
                              <td id="p24"></td>
                              <td id="q24"></td>
                            </tr>
                          </tbody>
                        </table>
                    </div>



                    <div class="col-" style="">
                        <table id="tableau_droit" class="table table-borderless">
                          <tbody>
                            <tr>
                              <td id="n8"></td>
                              <td id="p8"></td>
                              <td id="q8"></td>
                            </tr>
                            <tr>
                              <td id="n9"></td>
                              <td id="p9"></td>
                              <td id="q9"></td>
                            </tr>
                            <tr>
                              <td id="n10"></td>
                              <td id="p10"></td>
                              <td id="q10"></td>
                            </tr>
                            <tr>
                              <td id="n11"></td>
                              <td id="p11"></td>
                              <td id="q11"></td>
                            </tr>
                            <tr>
                              <td id="n12"></td>
                              <td id="p12"></td>
                              <td id="q12"></td>
                            </tr>
                            <tr>
                              <td id="n13"></td>
                              <td id="p13"></td>
                              <td id="q13"></td>
                            </tr>
                            <tr>
                              <td id="n14"></td>
                              <td id="p14"></td>
                              <td id="q14"></td>
                            </tr>
                            <tr>
                              <td id="n15"></td>
                              <td id="p15"></td>
                              <td id="q15"></td>
                            </tr>
                            <tr>
                              <td id="n16"></td>
                              <td id="p16"></td>
                              <td id="q16"></td>
                            </tr>
                            <tr>
                              <td id="n17"></td>
                              <td id="p17"></td>
                              <td id="q17"></td>
                            </tr>
                            <tr>
                              <td id="n18"></td>
                              <td id="p18"></td>
                              <td id="q18"></td>
                            </tr>
                            <tr>
                              <td id="n25"></td>
                              <td id="p25"></td>
                              <td id="q25"></td>
                            </tr>
                            <tr>
                              <td id="n26"></td>
                              <td id="p26"></td>
                              <td id="q26"></td>
                            </tr>
                            <tr>
                              <td id="n27"></td>
                              <td id="p27"></td>
                              <td id="q27"></td>
                            </tr>
                        </table>
                    </div>


                </div>

            </div>
            <div  style="position: absolute; top: 320px; right : 200px;text-align: center; width:120px; padding: 10px 120px 10px 10px">
                      <div id="date" style="width:240px;color: white; font-size: 25px">  </div>
                      <div id="heure" style="margin-left:42px; color: white; font-size: 35px">  </div>
                      <div id="fermeture" style="padding-top: 40px;width : 240px ; margin-left:5px; color: white; font-size: 22px">  </div>
                    </div>

        <div id="chart_div" style="position: absolute; top:10% ; left:9%; padding: 10px; width: 30%; height: 200px; background-color: transparent;"></div>
        <div id="chart_div2" style="position: absolute; top:10% ; right:9%; padding: 10px; width: 30%; height: 200px; background-color: transparent;"></div>


            <!-- <div id="affichage1" class="affichage">
                <div id="g1" style="height: 500px; width: 100%;"></div>
            </div> -->


            <div id="alert_info1">
                <h1>EXPLOSION DE LA BULLE !</h1>
                <video id="alert_video1" height="82%" autoplay>
                    <source src="video/1.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>

            <div id="alert_info2">
                <h1>KRASH BOURSIER !</h1>
                <video id="alert_video2" height="82%" autoplay>
                    <source src="video/2.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
        <img src="img/payicam.png">

        <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

        <script type="text/javascript" src="js/ecran.js"></script>
    </body>
</html>
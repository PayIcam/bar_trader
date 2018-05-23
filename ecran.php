<?php

session_start();

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
        
         <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    </head>

    <body>

      <h1> BIENVENUE AU BAR TRADER DE L'ICAM</h1>

      <h3 id="decompte"></h3>

      
<!--       <?php
date_default_timezone_set('Europe/Paris');
// --- La setlocale() fonctionnne pour strftime mais pas pour DateTime->format()
setlocale(LC_TIME, 'fr_FR.utf8','fra');// OK
// strftime("jourEnLettres jour moisEnLettres annee") de la date courante
$date = strftime("%A %d %B %Y");  $heure = strftime("%H:%M:%S");
?> -->

        <div class="container" style="padding: 5px">

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
                      </tbody>
                    </table>
                </div>



                <div class="col-" style="">
                    <table id="tableau_droit" class="table table-borderless">
                      <tbody>
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
                      </tbody>
                    </table>
                </div>

                
            </div>  

        </div>
        <div  style="position: absolute; top: 320px; right : 200px;text-align: center; width:120px; padding: 10px 120px 10px 10px">
                  <div id="date" style="width:240px;color: white; font-size: 25px">  </div>
                  <div id="heure" style="margin-left:42px; color: white; font-size: 35px">  </div>
                  <div id="fermeture" style="padding-top: 40px;width : 240px ; margin-left:5px; color: white; font-size: 22px">  </div>
                </div>

    <div id="chart_div" style="position: absolute; top:10% ; left:9%; padding: 10px; width: 30%; height: 200px; background-color: black"></div>
     <div id="chart_div2" style="position: absolute; top:10% ; right:9%; padding: 10px; width: 30%; height: 200px; background-color: black"></div>


        <!-- <div id="affichage1" class="affichage">
            <div id="g1" style="height: 500px; width: 100%;"></div>
        </div> -->

        <img src="img/payicam.png">

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

        <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

        <script type="text/javascript" src="js/ecran.js"></script>
    </body>
</html>
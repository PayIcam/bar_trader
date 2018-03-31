<?php 

session_start();

//$_SESSION['datetime'] = $_POST['date'] . " " . $_POST['time'];

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
        <title>Trader</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
        <link rel="stylesheet" href="css/style.css" />
    </head>

    <body>
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <td id="n0"></td>
                          <td id="p0"></td>
                          <td id="q0"></td>
                        </tr>
                        <tr>
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



                <div class="col-lg-6">
                    <table class="table table-borderless">
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
                        <!--tr>
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
                          <td id="q15"></td-->
                        </tr>
                      </tbody>
                    </table>
                </div>
            </div>
        </div>

        <img src="img/payicam.png">

        <h3 id="decompte"></h3>

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

        <script type="text/javascript" src="js/oXHR.js"></script>
        <script type="text/javascript" src="js/trader.js"></script>
    </body>
</html>
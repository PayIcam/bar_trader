
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Trader - Tester</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="shortcut icon" type="image/x-icon" href="img/logo.png" />
    </head>

    <body>
        <form>
            <?php

            include('data/config.php');

            // Connexion à la BDD
            $connexion = mysqli_connect($bdd_url, $bdd_login, $bdd_password, $bdd_database);

            $requete = "SELECT t_object_obj.obj_name AS nom, t_object_obj.obj_id AS id, t_price_pri.pri_credit AS prix FROM t_object_obj JOIN t_price_pri WHERE t_object_obj.obj_id = t_price_pri.obj_id AND obj_removed=0 AND t_object_obj.fun_id=2";
            $resultat = mysqli_query($connexion, $requete);

            // On affiche tous les articles dispos de la fondation
            while ($row = $resultat->fetch_assoc()) {
                $nom = utf8_encode($row['nom']);
                $id = $row['id'];

                echo '<input style="width:200px;" type="button" value="' . $nom . '" onclick="add(' . $id . ')"></br>';
            }

            ?>
        </form>
    </body>

    <script type="text/javascript" src="js/oXHR.js"></script>
    <script type="text/javascript">
        function add(id)
        {
            var xhr = getXMLHttpRequest();
    
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
                {
                    // Une fois la requête envoyée, on traite les données dans la fonction loop
                    
                }
            };

            xhr.open("GET", "tester_ajax.php?id=" + id);
            xhr.send(null);
        }
    </script>
</html>
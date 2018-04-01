
var boissons = {43 : {nom : "Saint Feuillien Grand Cru", prix_vente_calcule : 200, prix_vente_reel : 200, prix_init : 200, prix_revient : 160, prix_min : 100, nb_ventes : 0, recette : 0},
                8  : {nom : "1/2 Bière Spéciale"       , prix_vente_calcule : 200, prix_vente_reel : 200, prix_init : 200, prix_revient : 175, prix_min : 100, nb_ventes : 0, recette : 0},
                4  : {nom : "1/2 Stella"               , prix_vente_calcule : 100, prix_vente_reel : 100, prix_init : 100, prix_revient :  90, prix_min : 50, nb_ventes : 0, recette : 0},
                31 : {nom : "Chouffe"                  , prix_vente_calcule : 200, prix_vente_reel : 200, prix_init : 200, prix_revient : 165, prix_min : 100, nb_ventes : 0, recette : 0},
                360 : {nom : "Duvel"                   , prix_vente_calcule : 200, prix_vente_reel : 200, prix_init : 200, prix_revient : 175, prix_min : 100, nb_ventes : 0, recette : 0},
                721 : {nom : "Vedett"                  , prix_vente_calcule : 200, prix_vente_reel : 200, prix_init : 200, prix_revient : 160, prix_min : 100, nb_ventes : 0, recette : 0},
                32 : {nom : "Moinette"                 , prix_vente_calcule : 150, prix_vente_reel : 150, prix_init : 150, prix_revient : 135, prix_min : 100, nb_ventes : 0, recette : 0},
                258 : {nom : "Hommel bier"             , prix_vente_calcule : 150, prix_vente_reel : 150, prix_init : 150, prix_revient : 135, prix_min : 100, nb_ventes : 0, recette : 0},
                541 : {nom : "Gulden Draak"            , prix_vente_calcule : 200, prix_vente_reel : 200, prix_init : 200, prix_revient : 135, prix_min : 100, nb_ventes : 0, recette : 0},
                22 : {nom : "Queue de charrue"         , prix_vente_calcule : 200, prix_vente_reel : 200, prix_init : 200, prix_revient : 135, prix_min : 100, nb_ventes : 0, recette : 0},
                19 : {nom : "Barbar"                   , prix_vente_calcule : 200, prix_vente_reel : 200, prix_init : 200, prix_revient : 150, prix_min : 100, nb_ventes : 0, recette : 0},
                534 : {nom : "Malheur 10"              , prix_vente_calcule : 200, prix_vente_reel : 200, prix_init : 200, prix_revient : 170, prix_min : 100, nb_ventes : 0, recette : 0}};
                
// Temps minimal entre 2 événements
var tps_cooldown = 120;
var cooldown = 0;

// Baisse de prix lors d'une bulle
var pas_bulle = 20;
var pas_krash = 20;

var tps_rafraichissement = 10;
var rafraichissement = tps_rafraichissement;
var pas = 10;

// total des recettes de la soirée
var total_recettes = 0;

// recettes minimales pour faire du bénéfice
var recettes_min = 0;

var benefice_max = 5000;

var lecteur_video1 = document.querySelector('#alert_video1');
var lecteur_video2 = document.querySelector('#alert_video2');

// Appelle la fonction requete_transactions toutes les secondes
setInterval(requete_transactions, 1000);

// première initiaisation
requete_transactions();

// On cache l'écran d'alerte video
document.getElementById("alert_info1").style.display = 'none';
document.getElementById("alert_info2").style.display = 'none';
lecteur_video1.pause();
lecteur_video2.pause();

var video_en_cours = 0;


// fonction principale
function loop(oData)
{
    if(localStorage.getItem('tps_rafraichissement') != null){
        tps_rafraichissement = localStorage.getItem('tps_rafraichissement');
    }
    if(localStorage.getItem('var_prix') != null){
        pas = localStorage.getItem('var_prix');
    }
    if(localStorage.getItem('var_crash') != null){
        pas_krash = localStorage.getItem('var_crash');
    }
    if(localStorage.getItem('var_bulle') != null){
        pas_bulle = localStorage.getItem('var_bulle');
    }
    if(localStorage.getItem('benef_max') != null){
        benefice_max = localStorage.getItem('benef_max');
    }
    if(localStorage.getItem('tps_cooldown') != null){
        tps_cooldown = localStorage.getItem('tps_cooldown');
    }
    var rows = oData.getElementsByTagName("row");

    recettes_min = 0;

    for(var i = 0; i < rows.length; i++)
    {
        // On vérifie si l'objet fait partie du trading
        if(isset(boissons[rows[i].getAttribute('id')]))
        {
            var id = rows[i].getAttribute('id');
            var nombre_vendu_total = rows[i].getAttribute('nombre_vendu');

            total_recettes += (nombre_vendu_total - boissons[id]['nb_ventes']) * boissons[id]['prix_vente_reel'];
            recettes_min += nombre_vendu_total * boissons[id]['prix_revient'];

            boissons[id]['recette'] += (nombre_vendu_total - boissons[id]['nb_ventes']) * boissons[id]['prix_vente_reel'];
        }
    }

    // Calcul du bénéfice total de la soirée
    var benefice = total_recettes - recettes_min;

    if(benefice < 0 && cooldown < 0){

        ////////////////////////////////////////     KRACH BOURSIER    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        for(var id in boissons)
        {
            // Si la marge est < 0 on les remets à leur prix de revient
            if(boissons[id]['recette'] < boissons[id]['nb_ventes'] * boissons[id]['prix_revient'])
            {
                boissons[id]['prix_vente_calcule'] = boissons[id]['prix_revient'];
            }

            // On augmente les prix de pas_krash
            boissons[id]['prix_vente_calcule'] += pas_krash;
        }

        // Force la mise a jour
        rafraichissement = tps_rafraichissement;

        cooldown = tps_cooldown;
        lecteur_video2.play();
        document.getElementById("alert_info2").style.display = 'inline';
        video_en_cours = 1;

    }
    else if(benefice >= benefice_max && cooldown < 0)
    {
        ////////////////////////////////////////   EXPLOSION BULLE   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        // On réduit tout les prix de pas_bulle
        for(var id in boissons)
        {
            boissons[id]['prix_vente_calcule'] -= pas_bulle;

            if(boissons[id]['prix_vente_calcule'] > boissons[id]['prix_init'])
            {
                boissons[id]['prix_vente_calcule'] = boissons[id]['prix_init'];
            }
        }

        // Force la mise a jour
        rafraichissement = tps_rafraichissement;

        cooldown = tps_cooldown;
        lecteur_video1.play();
        document.getElementById("alert_info1").style.display = 'inline';
        video_en_cours = 1;
    }

    //////////////////////////////////////// FONCTIONNEMENT NORMAL \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    for(var i = 0; i < rows.length; i++)
    {
        // On vérifie si l'objet fait partie du trading
        if(isset(boissons[rows[i].getAttribute('id')]))
        {
            var id = rows[i].getAttribute('id');
            var nombre_vendu = rows[i].getAttribute('nombre_vendu') - boissons[id]['nb_ventes'];

            for(var boisson in boissons)
            {
                if(boisson == id)
                {
                    // On augmente le prix d'un pas par nb vendu
                    boissons[boisson]['nb_ventes'] += nombre_vendu;
                    boissons[boisson]['prix_vente_calcule'] = boissons[boisson]['prix_vente_calcule'] + pas * nombre_vendu;
                }
                else
                {
                    // On réduit le prix des autres boissons
                    var a = (pas * nombre_vendu)/(Object.keys(boissons).length - 1);
                    if(boissons[boisson]['prix_vente_calcule'] - a >= boissons[boisson]['prix_min']){
                        boissons[boisson]['prix_vente_calcule'] = boissons[boisson]['prix_vente_calcule'] - a;
                    }else{
                        boissons[boisson]['prix_vente_calcule'] = boissons[boisson]['prix_min'];
                    }
                }
            }
        }
    }
    
    if(video_en_cours == 0){
        rafraichissement ++;
    }
    cooldown --;

    localStorage.setItem('boissons', JSON.stringify(boissons));
    localStorage.setItem('recettes', total_recettes);

    // Si le délais tps_rafraichissement est écoulé, on mets à jour l'affichage et les prix sur la bdd
    if(rafraichissement > tps_rafraichissement)
    {
        mise_a_jour();
        rafraichissement = 0;
    }
    document.getElementById("decompte").innerHTML = tps_rafraichissement - rafraichissement;
}

// A la fin d'une animation video, on cache l'ecran d'alerte
lecteur_video1.addEventListener('ended', function(e) {
    document.getElementById("alert_info1").style.display = 'none';
    video_en_cours = 0;
});
lecteur_video2.addEventListener('ended', function(e) {
    document.getElementById("alert_info2").style.display = 'none';
    video_en_cours = 0;
});


// Mise à jour de la bdd et de l'affichage
function mise_a_jour()
{
    var i = 0;
    for(var id in boissons)
    {
        prix = boissons[id]['prix_vente_calcule'];

        // Le prix ne peut pas être inférieur à prix_min
        if(prix < boissons[id]['prix_min'])
        {
            prix = boissons[id]['prix_min'];
        }

        // On arroudi au centime près
        prix = Math.round(prix);

        // Changement du prix dans la bdd
        requete_mise_a_jour(id, prix);

        if(prix < boissons[id]['prix_vente_reel'])
        {
            // Si le prix a baissé
            document.getElementById("n" + i).innerHTML = "<i class='up'>⯆</i> " + boissons[id]['nom'];
            document.getElementById("q" + i).innerHTML = "-" + ((boissons[id]['prix_vente_reel'] - prix)/100).toFixed(2) + "€";
        }
        else if(prix > boissons[id]['prix_vente_reel'])
        {
            // Si le prix a augmenté
            document.getElementById("n" + i).innerHTML = "<i class='down'>⯅</i> " + boissons[id]['nom'];
            document.getElementById("q" + i).innerHTML = "+" + ((prix -  boissons[id]['prix_vente_reel'])/100).toFixed(2) + "€";
        }
        else
        {
            // Si le prix n'a pas changé
            document.getElementById("n" + i).innerHTML = "= " + boissons[id]['nom'];
            document.getElementById("q" + i).innerHTML = "+0.00€";
        }
        
        document.getElementById("p" + i).innerHTML = (prix/100).toFixed(2) + "€";

        boissons[id]['prix_vente_reel'] = prix;

        i++;
    }
}

// envoi des requêtes AJAX pour mettre a jour la bdd
function requete_mise_a_jour(id, prix)
{
    var xhr = getXMLHttpRequest();

    xhr.open("GET", "update_db.php?id=" + id + "&prix=" + prix);
    xhr.send(null);
}

// Envoie la requête AJAX pour récupérer les transactions depuis le début
function requete_transactions()
{
    var xhr = getXMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
        {
            // Une fois la requête envoyée, on traite les données dans la fonction loop
            loop(xhr.responseXML);
        }
    };

    xhr.open("GET", "data_test.php");
    xhr.send(null);
}

function isset ( strVariableName )
{ 
    if(typeof strVariableName !== 'undefined')
    {
        return true;
    }
    return false;
}

//// Graphique des ventes des bières

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
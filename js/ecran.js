var lecteur_video1 = document.querySelector('#alert_video1');
var lecteur_video2 = document.querySelector('#alert_video2');

var graphiques = null;
var position_graphique = 0;
var couleur = new Array("red","green","#13138D","#89138D","#845309","#841909","#E1C641","#4CB9AE","#7F3197","#BF1DB4","#ED7AA5");

// On cache l'écran d'alerte video
document.getElementById("alert_info1").style.display = 'none';
document.getElementById("alert_info2").style.display = 'none';
lecteur_video1.pause();
lecteur_video2.pause();


// A la fin d'une animation video, on cache l'ecran d'alerte
lecteur_video1.onended = function()
{
    document.getElementById("alert_info1").style.display = 'none';
    localStorage.setItem('video_en_cours', 0);
};
lecteur_video2.onended = function()
{
    document.getElementById("alert_info2").style.display = 'none';
    localStorage.setItem('video_en_cours', 0);
};

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(graph_init);

// Appel 2 fois pour remettre les deltas à 0
changement_affichage();
changement_affichage();

localStorage.setItem('ecran_on', 1);

console.log(localStorage);

// Si il y a modification des variables dans localStorage, on mets à jour
window.addEventListener('storage', function(e) {
  mise_a_jour();
});

function mise_a_jour()
{
    // Mise à jour du décompte
    document.getElementById("decompte").innerHTML = localStorage.getItem('compteur_rafraichissement_prix');

    // Réponse à la consigne de départ
    localStorage.setItem('ecran_on', 1);

    // Consigne de mise à jour de l'affichage
    if(localStorage.getItem('changement_affichage') == 1){
        changement_affichage();
        localStorage.setItem('changement_affichage', 0);
    }

    // Consigne de mise à jour des graphiques
    if(localStorage.getItem('changement_graphiques') == 1){
        changement_graphiques();
        localStorage.setItem('changement_graphiques', 0);
    }

    // consignes de lecture de videos
    if(localStorage.getItem('video_en_cours') == 1)
    {
        lecteur_video1.play();
        document.getElementById("alert_info1").style.display = 'inline';
    }

    if(localStorage.getItem('video_en_cours') == 2)
    {
        lecteur_video2.play();
        document.getElementById("alert_info2").style.display = 'inline';
    }

    // Si le message de la bannière change
    if(document.getElementById("banniere").innerHTML != localStorage.getItem('message_banniere'))
    {
        changement_banniere();
    }
}

// Changement des prix des articles
function changement_affichage()
{
    var boissons = JSON.parse(localStorage.getItem('boissons'));
    var i = 0;
    for(var id in boissons)
    {
        // On rajoute les valeurs sur les graphiques
        if(graphiques != null)
        {
            graphiques[id].push(['', boissons[id]['prix_vente_reel']/100.0]);
        }
        prix = boissons[id]['prix_vente_reel'];
        console.log("p" + i);
        ancien_prix = document.getElementById("p" + i).innerHTML.replace('€','').replace('.','');

        if(prix < ancien_prix)
        {
            // Si le prix a baissé
            document.getElementById("n" + i).className = 'up';
            document.getElementById("p" + i).className = 'up';
            document.getElementById("q" + i).className = 'up';
            document.getElementById("n" + i).innerHTML = "<i class='up'>⯆</i> " + boissons[id]['nom'];
            document.getElementById("q" + i).innerHTML = "-" + ((ancien_prix - prix)/100).toFixed(2) + "€";
        }
        else if(prix > ancien_prix)
        {
            // Si le prix a augmenté
            document.getElementById("n" + i).className = 'down';
            document.getElementById("p" + i).className = 'down';
            document.getElementById("q" + i).className = 'down';

            document.getElementById("n" + i).innerHTML = "<i class='down'>⯅</i> " + boissons[id]['nom'];
            document.getElementById("q" + i).innerHTML = "+" + ((prix -  ancien_prix)/100).toFixed(2) + "€";
        }
        else
        {
            // Si le prix n'a pas changé
            document.getElementById("n" + i).innerHTML = "= " + boissons[id]['nom'];
            document.getElementById("q" + i).innerHTML = "+0.00€";
        }

        document.getElementById("p" + i).innerHTML = (prix/100).toFixed(2) + "€";
        i++;
    }

    affichage_graphiques();
}

// On alterne les graphiques
function changement_graphiques()
{
    // Si les graphiques n'ont pas encore étés chargés, on ne mets rien à jour
    if(graphiques == null)
    {
        return;
    }

    position_graphique = position_graphique + 2;
    if(position_graphique >= Object.keys(graphiques).length)
    {
        position_graphique = position_graphique - Object.keys(graphiques).length;
    }

    // Puis on affiche les graphs
    affichage_graphiques();
}

function affichage_graphiques()
{
    // Si les graphiques n'ont pas encore étés chargés, on n'affiche rien
    if(graphiques == null)
    {
        return;
    }

    var i = 0;
    for(var id in graphiques)
    {
        // Premier graphique
        if(i == position_graphique)
        {
            var data = google.visualization.arrayToDataTable(graphiques[id]);

            var options = {
              title: 'Ventes',
              hAxis: {title: '',  titleTextStyle: {color: '#333'}},
              vAxis: {minValue: 0,  textStyle : { fontSize: 20, color: 'white'}, gridlines: { count: 3 }, format:'#.##€'},
              // backgroundColor:{"#04000C"}
              backgroundColor: {fill: "transparent"},
              // chartArea : {backgroundColor:"#04000C" },
              chartArea:{left:"60", top:"10", right:"0", bottom:"38"},
              colors:[graphiques[id][0][0]],
              areaOpacity:0.6,
              legend: {position: 'bottom',textStyle: {color: 'white', fontSize: 20}},
              // trendlines: {opacity:0.0, lineWidth:1}
              crosshair:{opacity:0.0}
            };

            var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }

        // 2nd graphique
        if(i == position_graphique + 1 || (i == 0 && position_graphique == Object.keys(graphiques).length - 1))
        {
            var data = google.visualization.arrayToDataTable(graphiques[id]);

            var options = {
              title: 'Ventes',
              hAxis: {title: '',  titleTextStyle: {color: '#333'}},
              vAxis: {minValue: 0,  textStyle : { fontSize: 20, color: 'white'}, gridlines: { count: 3 }, format:'#.##€'},
              // backgroundColor:{"#04000C"}
              backgroundColor: {fill: "transparent"},
              // chartArea : {backgroundColor:"#04000C" },
              chartArea:{left:"60", top:"10", right:"0", bottom:"38"},
              colors:[graphiques[id][0][0]],
              areaOpacity:0.6,
              legend: {position: 'bottom',textStyle: {color: 'white', fontSize: 20}},
              // trendlines: {opacity:0.0, lineWidth:1}
              crosshair:{opacity:0.0}

            };

            var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
            chart.draw(data, options);
        }

        i++;
    }
}

// Première initialisation des graphs
function graph_init()
{
    var boissons = JSON.parse(localStorage.getItem('boissons'));
    graphiques = {};
    var i = 0;
    for(var id in boissons)
    {
        var graphique = [[couleur[i], boissons[id]['nom']],
                         ['', boissons[id]['prix_vente_reel']/100.0]];
        graphiques[id] = graphique;

        i++;
    }

    affichage_graphiques();
}


function changement_banniere()
{
    // On change le texte
    var banniere = document.getElementById("banniere");
    banniere.innerHTML = localStorage.getItem('message_banniere');

    // On recalcule la durée
    var banniere_vitesse = 70; // px/s
    var banniere_largeur = $("#banniere").width();
    banniere.style.webkitAnimationDuration = (banniere_largeur/banniere_vitesse) + 's';
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////  Date et heure  /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function heure()
{
     var date = new Date();
     var heure = date.getHours();
     var minutes = date.getMinutes();
     var secondes = date.getSeconds();
     if(minutes < 10)
          minutes = "0" + minutes;
      if(secondes < 10)
          secondes = "0" + secondes;
     document.getElementById('heure').innerHTML = heure + ":" + minutes + ":" + secondes;
}

function dateFr()
{
     // les noms de jours / mois
     var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
     var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
     // on recupere la date
     var date = new Date();
     // on construit le message
     var message = jours[date.getDay()] + " ";   // nom du jour
     message += date.getDate() + " ";   // numero du jour
     message += mois[date.getMonth()] + " ";   // mois
     message += date.getFullYear();
     document.getElementById('date').innerHTML = message;
     var fermeture = "Fermeture du marché à"
     if(date.getDay()==1 | date.getDay()==5){
      fermeture += " 22h45";
     }else if(date.getDay()==2){
      fermeture += " 18h45";
     }else if(date.getDay()==3){
      fermeture += " 23h15";
     }else if(date.getDay()==4){
      fermeture += " 20h15";
     }
     document.getElementById('fermeture').innerHTML = fermeture;
}

dateFr();
setInterval(heure, 1000);
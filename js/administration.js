////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  Variables générales  /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*var boissons = {43 : {nom : "Saint Feuillien Grand Cru", prix_vente_calcule : 200, prix_vente_reel : 200, prix_init : 200, prix_revient : 160, prix_min : 100, nb_ventes : 0, recette : 0},
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
*/
var boissons = JSON.parse(localStorage.getItem('boissons'));

var temps_absolu = 0;
var on_pause = true;
var finished = false;
var forcer_evenement = 0;

// Définition des bénéfices de la soirée
var benefice_max = localStorage.getItem('benefice_max');
var benefice_min = localStorage.getItem('benefice_min');

var heure_debut = new Date(localStorage.getItem('heure_debut'));
var heure_debut_pour_php = localStorage.getItem('heure_debut_pour_php');
var heure_fin   = new Date(localStorage.getItem('heure_fin'));

var fondation = localStorage.getItem('fondation');

// Temps total du trader en secondes
var temps_absolu_total = Math.floor((heure_fin - heure_debut) /1000);

// Temps minimal entre 2 événements
var tps_cooldown = 120;
var cooldown = 0;

// Baisse de prix lors d'une bulle
var pas_bulle = 20;
var pas_krash = 20;

var tps_rafraichissement = 10;
var rafraichissement = tps_rafraichissement;
var pas = 10;

var pourcentage_benefices_initial = 0.1;

// total des recettes de la soirée
var total_recettes = 0;

// recettes minimales pour faire du bénéfice
var recettes_min = 0;

// Temps de mise à jour des graphiques publics
var tps_maj_graphiques = 20;
var maj_graphiques = 0;

var stat_evenement_krash = 0;
var stat_evenement_bulle = 0;

// Appelle la fonction requete_transactions toutes les secondes
setInterval(requete_transactions, 1000);

localStorage.setItem('ecran_on', 0);

// première initialisation
requete_transactions();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////  Partie gestion affichage  //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changer_affichage(numero)
{
    tout_cacher();
    document.getElementById('affichage'+numero).style.display = 'block';
    document.getElementById('button'+numero).className = 'button_nav_active';
    document.getElementById('titre_texte').innerHTML = document.getElementById('button'+numero).innerHTML;
    g1_draw();
    g2_draw();
    g3_draw();
}

// Cache toutes les pages
function tout_cacher()
{
    var i = 0;
    while(true)
    {
        if(document.getElementById('affichage'+i) == null)
        {
            break;
        }
        else
        {
            document.getElementById('affichage'+i).style.display = 'none';
            document.getElementById('button'+i).className = 'button_nav_unactive';
        }
        i++;
    }
}

function pause()
{
    if(finished)
    {
        return;
    }
    document.getElementById('pause').className = 'btn btn-primary';
    document.getElementById('demarrer').className = 'btn btn-outline-success';
    on_pause = true;
}

function demarrer()
{
    if(finished)
    {
        return;
    }

    // Si l'écran n'est pas allumé
    if(localStorage.getItem('ecran_on') == 0)
    {
        alert("L'écran n'est pas allumé");
        return;
    }
    document.getElementById('pause').className = 'btn btn-outline-primary';
    document.getElementById('demarrer').className = 'btn btn-success';
    on_pause = false;
}

function reinitialiser()
{
    if(finished)
    {
        return;
    }
    if(!confirm("Voulez-vous vraiment réinitialiser les prix ?"))
    {
        return;
    }

    for(var id in boissons)
    {
        boissons[id]['prix_vente_calcule'] = boissons[id]['prix_init'];
        boissons[id]['prix_vente_reel'] = boissons[id]['prix_init'];
        requete_mise_a_jour(id, boissons[id]['prix_init']);
    }
}

function stop()
{
    if(finished)
    {
        return;
    }
    if(!confirm("Voulez-vous stopper le trader ?"))
    {
        return;
    }

    for(var id in boissons)
    {
        boissons[id]['prix_vente_calcule'] = boissons[id]['prix_init'];
        boissons[id]['prix_vente_reel'] = boissons[id]['prix_init'];
        boissons[id]['nb_ventes'] = 0;
        boissons[id]['recette'] = 0;
        requete_mise_a_jour(id, boissons[id]['prix_init']);
    }
    finished = true;
    update_affichage_tableau();

    document.getElementById('pause').className = 'btn btn-outline-primary';
    document.getElementById('demarrer').className = 'btn btn-outline-success';
    document.getElementById('stop').className = 'btn btn-danger';
}

// Par défaut, affichage de la page 0
changer_affichage(0);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////  Partie Variables Générales  //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Initialisation des valeurs
initialiser_variable();

function initialiser_variable()
{
    for(var i = 0; i <= 7; i++)
    {
        document.getElementById("val_valeur" + i).innerHTML = get_variable_valeur(i) + get_variable_unite(i);
        document.getElementById("mod_valeur" + i).style.display = 'block';
        document.getElementById("con_valeur" + i).style.display = 'none';
        document.getElementById("ann_valeur" + i).style.display = 'none';
    }
}

function modifier_variable(numero)
{
    initialiser_variable();
    var valeur = document.getElementById("val_valeur" + numero);

    valeur.innerHTML = '<input class="inp_valeur" type="number" id="inp_valeur' + numero + '" value=' + get_variable_valeur(numero) + ' style="height: auto; width: 160px">';
    document.getElementById("mod_valeur" + numero).style.display = 'none';
    document.getElementById("con_valeur" + numero).style.display = 'block';
    document.getElementById("ann_valeur" + numero).style.display = 'block';
}

function confirmer_variable(numero)
{
    var valeur_saisie = document.getElementById("inp_valeur" + numero).value;
    var valeur = document.getElementById("val_valeur" + numero);

    valeur.innerHTML = valeur_saisie;
    set_variable_valeur(numero, valeur_saisie);

    initialiser_variable();
}

function annuler_variable(numero)
{
    initialiser_variable();
}

function get_variable_unite(numero)
{
    switch(numero){
        case 0:
        case 6:
        case 7:
            return 's';
            break;
        default :
            return 'c';
            break;
    }
}

function get_variable_valeur(numero) {
    switch(numero){
        case 0:
            return tps_rafraichissement;
            break;
        case 1:
            return pas;
            break;
        case 2:
            return pas_bulle;
            break;
        case 3:
            return pas_krash;
            break;
        case 4:
            return benefice_max;
            break;
        case 5:
            return benefice_min;
            break;
        case 6:
            return tps_cooldown;
            break;
        case 7:
            return tps_maj_graphiques;
            break;
    }
}

function set_variable_valeur(numero, valeur) {
    switch(numero){
        case 0:
            tps_rafraichissement = valeur;
            break;
        case 1:
            pas = valeur;
            break;
        case 2:
            pas_bulle = valeur;
            break;
        case 3:
            pas_krash = valeur;
            break;
        case 4:
            benefice_max = valeur;
            localStorage.setItem("benefice_max", valeur);
            break;
        case 5:
            benefice_min = valeur;
            localStorage.setItem("benefice_min", valeur);
            break;
        case 6:
            tps_cooldown = valeur;
            break;
        case 7:
            tps_maj_graphiques = valeur;
            break;
    }
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////  Partie affichage du tableau boissons  /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function update_affichage_tableau(){
    var tableau = document.getElementById("tableau");

    while (tableau.firstChild) {
      tableau.removeChild(tableau.firstChild);
    }

    var total_benefice = 0;
    var total_recette = 0;

    var head = tableau.createTHead();
    var ligne = head.insertRow(0);
    ligne.insertCell(0).outerHTML = "<td>Nom</td>";
    ligne.insertCell(1).outerHTML = "<td>Prix vente calculé</td>";
    ligne.insertCell(2).outerHTML = "<td>Prix vente réel</td>";
    ligne.insertCell(3).outerHTML = "<td>Prix initial</td>";
    ligne.insertCell(4).outerHTML = "<td>Prix revient</td>";
    ligne.insertCell(5).outerHTML = "<td>Prix min</td>";
    ligne.insertCell(6).outerHTML = "<td>Nb ventes</td>";
    ligne.insertCell(7).outerHTML = "<td>Recette</td>";
    ligne.insertCell(8).outerHTML = "<td>Bénéfice</td>";

    var head = tableau.createTBody();

    for(var id in boissons){
        var ligne = head.insertRow(-1);
        for(var e in boissons[id]){
            var cellule = ligne.insertCell(-1);
            if(e == 'prix_vente_calcule'){
                cellule.outerHTML = '<th><button type="button" class="btn btn-primary btn-sm" onclick="modifier_prix(' + id + ');"><i class="fas fa-pencil-alt"></i></button> ' + boissons[id][e] + '</th>';
            }else{
                cellule.outerHTML = "<th>" + boissons[id][e] + "</th>";
            }
        }
        var cellule = ligne.insertCell(-1);
        var benef = boissons[id]['recette'] - boissons[id]['prix_revient'] * boissons[id]['nb_ventes'];
        cellule.outerHTML = "<th>" + benef + "</th>";

        total_recette += boissons[id]['recette'];
        total_benefice += benef;
    }

    var ligne = head.insertRow(-1);
    var cellule = ligne.insertCell(-1);
    var cellule = ligne.insertCell(-1);
    var cellule = ligne.insertCell(-1);
    var cellule = ligne.insertCell(-1);
    var cellule = ligne.insertCell(-1);
    var cellule = ligne.insertCell(-1);
    var cellule = ligne.insertCell(-1);
    var cellule = ligne.insertCell(-1);
    cellule.outerHTML = "<th>" + total_recette + "</th>";
    var cellule = ligne.insertCell(-1);
    cellule.outerHTML = "<th>" + total_benefice + "</th>";
}

function modifier_prix(id) {
    var prix = prompt("Entrez le nouveau prix");
    if (prix != null && prix > 0) {
        boissons[id]['prix_vente_calcule'] = prix;
    }
}

var g1_chart = null;
var g1_data = null;
var g1_options = null;
var g1_isinit = false;

google.charts.load('current', {packages:['corechart']});
google.charts.setOnLoadCallback(g1_init);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  Partie statistiques  /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function update_stats()
{
    var stat_recette = 0;
    var stat_ventes = 0;
    var stat_biere_plus_vendue = "";
    var stat_biere_plus_vendue_nb = 0;
    for(id in boissons)
    {
        stat_recette += boissons[id]['recette'];
        stat_ventes += Number(boissons[id]['nb_ventes']);
        if(Number(boissons[id]['nb_ventes']) > stat_biere_plus_vendue_nb)
        {
            stat_biere_plus_vendue_nb = Number(boissons[id]['nb_ventes']);
            stat_biere_plus_vendue = boissons[id]['nom'];
        }
    }
    document.getElementById('stat0').innerHTML = stat_recette + 'c';
    document.getElementById('stat1').innerHTML = ' ' + stat_ventes;
    document.getElementById('stat2').innerHTML = ' ' + stat_biere_plus_vendue + ' (' + stat_biere_plus_vendue_nb + ')';
    document.getElementById('stat4').innerHTML = ' ' + Math.round(stat_ventes / (temps_absolu / 60)) + ' bières/minute';
    document.getElementById('stat5').innerHTML = ' ' + stat_evenement_krash;
    document.getElementById('stat6').innerHTML = ' ' + stat_evenement_bulle;
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////  Partie des graphiques  ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

setInterval(update_graphiques, 10000);

function update_graphiques()
{
    g1_update();
    g2_update();
    g3_update();
}

function g1_init() {
    g1_options = {
        chartArea: {width: '70%', height: '85%'},
        hAxis: {
                title: "Temps (s)"
            },
            vAxis: {
                title: "Prix (c)",
                minValue: 0
            }
    };

    g1_chart = new google.visualization.LineChart(document.getElementById('g1'));
    g1_data = new google.visualization.DataTable();
    g1_data.addColumn('number', 'Temps');
    var row = [temps_absolu];
    for(id in boissons)
    {
        g1_data.addColumn('number', boissons[id]['nom']);
        row.push(Number(boissons[id]['prix_vente_calcule']));

    }
    g1_data.addRow(row);
    g1_isinit = true;
    g1_draw();
}

    
function g1_draw()
{
    if(g1_isinit)
    g1_chart.draw(g1_data, g1_options);
}

function g1_update()
{
    if(g1_isinit == false)
    {
        return;
    }
    var row = [temps_absolu];
    for(id in boissons)
    {
        row.push(Number(boissons[id]['prix_vente_calcule']));
    }
    g1_data.addRow(row);
    g1_draw();
}



var g2_chart = null;
var g2_data = null;
var g2_options = null;
var g2_isinit = false;

google.charts.setOnLoadCallback(g2_init);

function g2_init() {
    g2_options = {
        chartArea: {width: '70%', height: '85%'},
        hAxis: {
                title: "Temps (s)"
            },
            vAxis: {
                title: "Nombre de ventes",
                minValue: 0
            }
    };

    g2_chart = new google.visualization.LineChart(document.getElementById('g2'));
    g2_data = new google.visualization.DataTable();
    g2_data.addColumn('number', 'Temps');
    var row = [temps_absolu];
    for(id in boissons)
    {
        g2_data.addColumn('number', boissons[id]['nom']);
        row.push(Number(boissons[id]['nb_ventes']));
    }
    g2_data.addRow(row);
    g2_isinit = true;
    g2_draw();
}

    
function g2_draw()
{
    if(g2_isinit)
    g2_chart.draw(g2_data, g2_options);
}

function g2_update()
{
    if(g2_isinit == false)
    {
        return;
    }
    var row = [temps_absolu];
    for(id in boissons)
    {
        row.push(Number(boissons[id]['nb_ventes']));
    }
    g2_data.addRow(row);
    g2_draw();
}


google.charts.setOnLoadCallback(g3_init);

var g3_chart = null;
var g3_data = null;
var g3_options = null;
var g3_isinit = false;

function g3_init()
{
    g3_options = {
        chartArea: {width: '70%', height: '85%'},
        interpolateNulls: true,
        hAxis: {
                title: "Temps (s)"
            },
            vAxis: {
                title: "Bénéfice (c)",
                minValue: 0
            }
    };

    g3_data = new google.visualization.DataTable();
    g3_data.addColumn('number', 'Temps');
    g3_data.addColumn('number', 'Bénéfice réel');
    
    g3_data.addRow([0, 0]);

    g3_chart = new google.visualization.LineChart(document.getElementById('g3'));
    g3_isinit = true;
    g3_update();
}

function g3_draw()
{
    if(g3_isinit)
    {
        var data1 = new google.visualization.DataTable();
        data1.addColumn('number', 'Temps');
        data1.addColumn('number', 'Bénéfice Min');
        
        data1.addRows([
          [0, - Number(benefice_max) * pourcentage_benefices_initial],
          [temps_absolu_total, Number(benefice_min)]
        ]);
        
        var data2 = new google.visualization.DataTable();
        data2.addColumn('number', 'Temps');
        data2.addColumn('number', 'Bénéfice Max');
        
        data2.addRows([
          [0, Number(benefice_max) * pourcentage_benefices_initial],
          [temps_absolu_total, Number(benefice_max)]
        ]);

        var joinedData = google.visualization.data.join(data1, data2, 'full', [[0, 0]], [1], [1]);
        joinedData = google.visualization.data.join(joinedData, g3_data, 'full', [[0, 0]], [1,2], [1]);

        g3_chart.draw(joinedData, g3_options);
    }
}

function g3_update()
{
    if(g3_isinit)
    {
        var benefice = 0;
        for(id in boissons)
        {
            benefice += boissons[id]['recette'] - boissons[id]['nb_ventes'] * boissons[id]['prix_revient'];
        }
        g3_data.addRow([temps_absolu, benefice]);

        g3_draw();
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////  Boucle Débug  ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


setInterval(update_debug, 1000);

function update_debug()
{
    document.getElementById('debug0').innerHTML = heure_debut;
    document.getElementById('debug1').innerHTML = heure_fin;
    document.getElementById('debug2').innerHTML = new Date();
    document.getElementById('debug3').innerHTML = temps_absolu;
    document.getElementById('debug4').innerHTML = temps_absolu_total;
    document.getElementById('debug5').innerHTML = on_pause;
    document.getElementById('debug6').innerHTML = finished;
    document.getElementById('debug7').innerHTML = fondation;
    document.getElementById('debug8').innerHTML = localStorage.getItem('video_en_cours');
    document.getElementById('debug9').innerHTML = maj_graphiques;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////  Boucle Trader  ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Envoie la requête AJAX pour récupérer les transactions depuis le début
function requete_transactions()
{
    if(finished || new Date() < heure_debut)
    {
        return;
    }

    temps_absolu ++;

    if(on_pause)
    {
        update_affichage_tableau();
        return;
    }

    if(localStorage.getItem('video_en_cours') == 0)
    {
        rafraichissement --;
    }

    if(rafraichissement < 0)
    {
        rafraichissement = tps_rafraichissement;
    }

    document.getElementById('compteur_texte').innerHTML = rafraichissement;
    localStorage.setItem('rafraichissement',  rafraichissement);

    maj_graphiques --;

    if(maj_graphiques <= 0)
    {
        maj_graphiques = tps_maj_graphiques;
        localStorage.setItem('changement_graphiques', 1);
    }

    var xhr = getXMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
        {
            // Une fois la requête envoyée, on traite les données dans la fonction loop
            loop(xhr.responseXML);
        }
    };

    xhr.open("GET", "data.php?heure=" + heure_debut_pour_php + "&fondation=" + fondation);
    xhr.send(null);
}

// fonction principale
function loop(oData)
{
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

    document.getElementById('benef_tps_reel').innerHTML = 'Bénéfice en temps réel : ' + benefice + 'c';
    document.getElementById('stat3').innerHTML = ' ' + benefice + 'c';

    if((benefice < - benefice_max * pourcentage_benefices_initial + (1 + pourcentage_benefices_initial) * benefice_min / temps_absolu_total * temps_absolu || forcer_evenement == 2) && cooldown < 0){

        ////////////////////////////////////////     KRACH BOURSIER    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        forcer_evenement = 0;

        for(var id in boissons)
        {
            // Si la marge est < 0 on les remets à leur prix de revient
            if(boissons[id]['recette'] < boissons[id]['nb_ventes'] * boissons[id]['prix_revient'])
            {
                boissons[id]['prix_vente_calcule'] = boissons[id]['prix_revient'];
            }

            // On augmente les prix de pas_krash
            boissons[id]['prix_vente_calcule'] = Number(boissons[id]['prix_vente_calcule']) + pas_krash;
        }

        // Force la mise a jour
        rafraichissement = -2;

        cooldown = tps_cooldown;
        localStorage.setItem('video_en_cours', 2);

        stat_evenement_krash ++;

    }
    else if((benefice >= benefice_max * pourcentage_benefices_initial + (1 - pourcentage_benefices_initial) * benefice_max / temps_absolu_total * temps_absolu || forcer_evenement == 1) && cooldown < 0)
    {
        ////////////////////////////////////////   EXPLOSION BULLE   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        forcer_evenement = 0;

        // On réduit tout les prix de pas_bulle
        for(var id in boissons)
        {
            boissons[id]['prix_vente_calcule'] -= Number(pas_bulle);

            if(boissons[id]['prix_vente_calcule'] > boissons[id]['prix_init'])
            {
                boissons[id]['prix_vente_calcule'] = boissons[id]['prix_init'];
            }
        }

        // Force la mise a jour
        rafraichissement = -2;

        cooldown = tps_cooldown;
        localStorage.setItem('video_en_cours', 1);

        stat_evenement_bulle ++;
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
                    boissons[boisson]['prix_vente_calcule'] = Number(boissons[boisson]['prix_vente_calcule']) + pas * nombre_vendu;
                }
                else
                {
                    // On réduit le prix des autres boissons
                    var a = (pas * nombre_vendu)/(Object.keys(boissons).length - 1);
                    if(boissons[boisson]['prix_vente_calcule'] - a >= boissons[boisson]['prix_min'])
                    {
                        boissons[boisson]['prix_vente_calcule'] = boissons[boisson]['prix_vente_calcule'] - a;
                    }
                    else
                    {
                        boissons[boisson]['prix_vente_calcule'] = boissons[boisson]['prix_min'];
                    }
                }
            }

            boissons[id]['nb_ventes'] = rows[i].getAttribute('nombre_vendu');
        }
    }
    
    cooldown --;

    document.getElementById('affichage_cooldown').innerHTML = 'Cooldown : ' + cooldown;

    // Si le délais tps_rafraichissement est écoulé, on mets à jour l'affichage et les prix sur la bdd

    if(rafraichissement == tps_rafraichissement && localStorage.getItem('video_en_cours') == 0)
    {
        mise_a_jour();
    }

    // Si on a forcé la maj, on remet le compteur au début
    if(rafraichissement == -2)
    {
        mise_a_jour();
        rafraichissement = tps_rafraichissement;
    }

    update_affichage_tableau();
    update_stats();
}


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

        boissons[id]['prix_vente_reel'] = prix;

        i++;
    }

    localStorage.setItem('boissons', JSON.stringify(boissons));
    localStorage.setItem('changement_affichage', 1);
}

// envoi des requêtes AJAX pour mettre a jour la bdd
function requete_mise_a_jour(id, prix)
{
    var xhr = getXMLHttpRequest();

    xhr.open("GET", "update_db.php?id=" + id + "&prix=" + prix);
    xhr.send(null);
}

function isset(strVariableName)
{ 
    if(typeof strVariableName !== 'undefined')
    {
        return true;
    }
    return false;
}

// Confirmation pour quitter la page pendant le fonctionnement du trader
window.addEventListener("beforeunload", function (e)
{
    stop();
    if(!finished)
    {
        var confirmationMessage = "Recharger cette page peux corrompre le trader. Etes vous sur ?";
        e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
        return confirmationMessage;              // Gecko, WebKit, Chrome <34
    }
});
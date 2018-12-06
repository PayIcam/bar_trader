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
var cooldown_animations = 2500;
var compteur_cooldown_animations = 300;

// Baisse de prix lors d'une bulle
var pas_bulle = 20;
var pas_krach = 20;

var temps_rafraichissement_prix = 10;
var compteur_rafraichissement_prix = temps_rafraichissement_prix;
var variation_par_achat = 10;
var change_price_request = 0;

var pourcentage_benefices_initial = 0.1;

// total des recettes de la soirée
var total_recettes = 0;

// recettes minimales pour faire du bénéfice
var recettes_min = 0;

// Temps de mise à jour des graphiques publics
var tps_maj_graphiques_ecran = 5;
var compteur_maj_graphiques_ecran = 0;

localStorage.setItem('message_banniere', "BIENVENUE AU BAR TRADER DE L'ICAM");

var stat_evenement_krash = 0;
var stat_evenement_bulle = 0;

localStorage.setItem('ecran_on', 0);

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
    $('#demarrer').removeAttr('disabled');
    $('#pause').attr('disabled', 'disabled');
    if(typeof(mise_a_jour_compteur_function) != "undefined")
        clearInterval(mise_a_jour_compteur_function);
    if(typeof(requete_transactions_function) != "undefined")
        clearInterval(requete_transactions_function);
    on_pause = true;
}

function demarrer()
{
    if(finished)
    {
        return;
    }

    on_pause = false;
    // Si l'écran n'est pas allumé
    if(localStorage.getItem('ecran_on') == 0)
    {
        alert("L'écran n'est pas allumé");
        return;
    }
    document.getElementById('pause').className = 'btn btn-outline-primary';
    document.getElementById('demarrer').className = 'btn btn-success';
    $('#demarrer').attr('disabled', 'disabled');
    $('#pause').removeAttr('disabled');
    $('#reinitialiser').removeAttr('disabled');
    $('#stop').removeAttr('disabled');

    benefice = 0;
    total_recettes = 0;
    total_ventes = 0;
    for(id in boissons)
    {
        total_recettes += boissons[id]['recette'];
        total_ventes += Number(boissons[id]['nb_ventes']);
        recettes_min += boissons[id]['nb_ventes'] * boissons[id]['prix_revient'];
    }

    update_stats();
    update_graphiques();
    update_affichage_tableau();
    update_debug();

    benefice = total_recettes - recettes_min;

    mise_a_jour_bdd_ecran();
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
    }

    requete_mise_a_jour(boissons);

}

function stop()
{
    if(finished) {
        return;
    }

    if(!confirm("Voulez-vous stopper le trader ?")) {
        return;
    }

    localStorage.setItem('final_stats', false);
    localStorage.setItem('video_en_cours', 0);

    $('#demarrer').attr('disabled', 'disabled');
    $('#pause').attr('disabled', 'disabled');
    $('#reinitialiser').attr('disabled', 'disabled');
    $('#stop').attr('disabled', 'disabled');
    if(typeof(mise_a_jour_compteur_function) != "undefined")
        clearInterval(mise_a_jour_compteur_function);
    if(typeof(requete_transactions_function) != "undefined")
        clearInterval(requete_transactions_function);

    requete_mise_a_jour(boissons);

    for(var id in boissons)
    {
        boissons[id]['prix_vente_calcule'] = boissons[id]['prix_init'];
        boissons[id]['prix_vente_reel'] = boissons[id]['prix_init'];
        boissons[id]['nb_ventes'] = 0;
        boissons[id]['recette'] = 0;
    }

    finished = true;
    update_affichage_tableau();

    document.getElementById('pause').className = 'btn btn-outline-primary';
    document.getElementById('demarrer').className = 'btn btn-outline-success';
    document.getElementById('stop').className = 'btn btn-danger';

    var article_ids = JSON.stringify(Object.keys(JSON.parse(localStorage.getItem('boissons'))));
    var data = 'heure=' + heure_debut_pour_php + '&fondation=' + window.encodeURIComponent(fondation) + '&article_ids=' +  article_ids;

    $.post("processing/final_stats.php", {article_ids: article_ids, start: heure_debut_pour_php, fun_id: window.encodeURIComponent(fondation)}, set_final_stats);
}

function set_final_stats(data) {
    data = JSON.parse(data);
    final_stats = {bar_stats: data.bar_stats, best_performers: data.best_performers, most_gained: data.most_gained, most_payed: data.most_payed, article_stats: data.article_stats};
    console.log(final_stats);
}

function display_final_stats() {
    localStorage.setItem('final_stats', JSON.stringify(final_stats));
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
    for(var i = 0; i <= 8; i++)
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

    if(numero == 8)
    {
        valeur.innerHTML = '<input class="inp_valeur" id="inp_valeur' + numero + '" value="' + get_variable_valeur(numero) + '" style="height: auto; width: 450px">';
    }else
    {
        valeur.innerHTML = '<input class="inp_valeur" type="number" id="inp_valeur' + numero + '" value=' + get_variable_valeur(numero) + ' style="height: auto; width: 160px">';
    }
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
        case 8:
            return '';
            break;
        default :
            return 'c';
            break;
    }
}

function get_variable_valeur(numero) {
    switch(numero){
        case 0:
            return temps_rafraichissement_prix;
            break;
        case 1:
            return variation_par_achat;
            break;
        case 2:
            return pas_bulle;
            break;
        case 3:
            return pas_krach;
            break;
        case 4:
            return benefice_max;
            break;
        case 5:
            return benefice_min;
            break;
        case 6:
            return cooldown_animations;
            break;
        case 7:
            return tps_maj_graphiques_ecran;
            break;
        case 8:
            return localStorage.getItem('message_banniere');
            break;
    }
}

function set_variable_valeur(numero, valeur) {
    switch(numero){
        case 0:
            temps_rafraichissement_prix = valeur;
            break;
        case 1:
            variation_par_achat = valeur;
            break;
        case 2:
            pas_bulle = valeur;
            break;
        case 3:
            pas_krach = valeur;
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
            cooldown_animations = valeur;
            break;
        case 7:
            tps_maj_graphiques_ecran = valeur;
            break;
        case 8:
            localStorage.setItem('message_banniere', valeur);
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
            } else if(e == 'nb_ventes') {
                cellule.outerHTML = "<th>" + boissons[id][e] + " (" + boissons[id]['max_une_fois'] + ")" + "</th>";
            }
            else{
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
    var stat_biere_plus_vendue = "";
    var stat_biere_plus_vendue_nb = 0;
    for(id in boissons)
    {
        if(Number(boissons[id]['nb_ventes']) > stat_biere_plus_vendue_nb)
        {
            stat_biere_plus_vendue_nb = Number(boissons[id]['nb_ventes']);
            stat_biere_plus_vendue = boissons[id]['nom'];
        }
    }
    document.getElementById('stat0').innerHTML = total_recettes + 'c';
    document.getElementById('stat1').innerHTML = ' ' + Number(total_ventes);
    document.getElementById('stat2').innerHTML = ' ' + stat_biere_plus_vendue + ' (' + stat_biere_plus_vendue_nb + ')';
    document.getElementById('benefice').innerHTML = ' ' + benefice + 'c';
    document.getElementById('stat4').innerHTML = ' ' + Math.round(total_ventes / (temps_absolu / 60)) + ' bières/minute';
    document.getElementById('stat5').innerHTML = ' ' + stat_evenement_krash;
    document.getElementById('stat6').innerHTML = ' ' + stat_evenement_bulle;
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////  Partie des graphiques  ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

        var benef_min_initial = benefice_min/10;
        var benef_max_initial = benefice_max/10
        var temps_stabilisation_benef = temps_absolu_total * 0.8;

        data1.addRows([
          [0, - Number(benef_min_initial)],
          [Number(temps_stabilisation_benef), Number(benefice_min)],
          [Number(temps_absolu_total), Number(benefice_min)]
        ]);

        var data2 = new google.visualization.DataTable();
        data2.addColumn('number', 'Temps');
        data2.addColumn('number', 'Bénéfice Max');

        data2.addRows([
          [0, Number(benef_max_initial)],
          [Number(temps_stabilisation_benef), Number(benefice_max)],
          [Number(temps_absolu_total), Number(benefice_max)]
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
        g3_data.addRow([temps_absolu, benefice]);

        g3_draw();
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////  Boucle Débug  ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
    document.getElementById('debug9').innerHTML = compteur_maj_graphiques_ecran;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////  Boucle Trader  ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function update_done() {
    if(!finished) {
        compteur_rafraichissement_prix = temps_rafraichissement_prix;
        window.mise_a_jour_compteur_function = setInterval(mise_a_jour_compteur, 1000);
        window.requete_transactions_function = setInterval(requete_transactions, 5000);
    } else {
        compteur_rafraichissement_prix = 20;
        window.compteur_fin_function = setInterval(compteur_fin, 1000);
    }
}

function mise_a_jour_compteur() {
    if(finished || new Date() < heure_debut) {
        return;
    }

    temps_absolu = Math.floor((Date.now() - heure_debut) /1000);

    if(on_pause) {
        update_affichage_tableau();
        return;
    }

    if(localStorage.getItem('video_en_cours') == 0) {
        compteur_rafraichissement_prix --;
    }

    if(compteur_rafraichissement_prix == 0) {
        mise_a_jour_bdd_ecran();
    }

    document.getElementById('compteur_texte').innerHTML = compteur_rafraichissement_prix;
    localStorage.setItem('compteur_rafraichissement_prix',  compteur_rafraichissement_prix);

    compteur_maj_graphiques_ecran --;

    if(compteur_maj_graphiques_ecran <= 0) {
        compteur_maj_graphiques_ecran = tps_maj_graphiques_ecran;
        localStorage.setItem('changement_graphiques', 1);
    }

    compteur_cooldown_animations --;

    document.getElementById('affichage_cooldown').innerHTML = 'Cooldown : ' + compteur_cooldown_animations;
}

function compteur_fin() {
    compteur_rafraichissement_prix --;
    document.getElementById('compteur_texte').innerHTML = compteur_rafraichissement_prix;
    localStorage.setItem('compteur_rafraichissement_prix',  compteur_rafraichissement_prix);

    if(compteur_rafraichissement_prix ==0) {
        clearInterval(compteur_fin_function);
        display_final_stats();
    }
}

// Envoie la requête AJAX pour récupérer les transactions depuis le début
function requete_transactions()
{
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
        {
            // Une fois la requête envoyée, on traite les données dans la fonction loop
            fonction_principale(xhr.responseXML);
        }
    };

    var article_ids = JSON.stringify(Object.keys(JSON.parse(localStorage.getItem('boissons'))));
    var data = 'heure=' + heure_debut_pour_php + '&fondation=' + window.encodeURIComponent(fondation) + '&article_ids=' +  article_ids;

    xhr.open("POST", "processing/data.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(encodeURI(data));
}

/**
 * Cette fonction permet de définir les nouvelles recettes et bénéfices générales, et celles de chaque article. Elle est appelée en callback de la récupération des ventes depuis le début du trader.
 * @param  xml_response Articles vendus depuis le début du trader en xml
 */
function definition_nouveaux_prix_benefices(xml_response) {
    rows = xml_response.getElementsByTagName("row");

    for(var i = 0; i < rows.length; i++)
    {
        // On vérifie si l'objet fait partie du trading
        if(isset(boissons[rows[i].getAttribute('id')]))
        {
            var id = rows[i].getAttribute('id');
            var nombre_vendu_total = rows[i].getAttribute('nombre_vendu');
            var nombre_nouvelles_ventes = nombre_vendu_total - boissons[id]['nb_ventes'];
            var ajout_recette = nombre_nouvelles_ventes * boissons[id]['prix_vente_reel'];
            var nombre_articles = Object.keys(boissons).length;

            boissons[id]['nb_ventes'] = nombre_vendu_total;
            boissons[id]['max_une_fois'] = Math.max(boissons[id]['max_une_fois'], nombre_nouvelles_ventes);
            boissons[id]['recette'] += ajout_recette;

            total_recettes += ajout_recette;
            total_ventes += nombre_nouvelles_ventes;
            recettes_min += nombre_nouvelles_ventes * boissons[id]['prix_revient'];

            for(var boisson in boissons) {
                if(boisson == id) {
                    boissons[boisson]['prix_vente_calcule'] += variation_par_achat * nombre_nouvelles_ventes;
                } else {
                    var a = (variation_par_achat * nombre_nouvelles_ventes)/(nombre_articles - 1);
                    if(boissons[boisson]['prix_vente_calcule'] - a >= boissons[boisson]['prix_min']) {
                        boissons[boisson]['prix_vente_calcule'] -= a;
                    } else {
                        boissons[boisson]['prix_vente_calcule'] = boissons[boisson]['prix_min'];
                    }
                }
            }

        }
    }

    benefice = total_recettes - recettes_min;
}

/**
 * Fonction qui définit si il devrait y avoir un krash ou une bulle.
 *
 * Si on demande un krash ou une bulle, on lance l'évènement correspondant
 *
 * Sinon, on définit le bénéfice actuel max & min
 * Si le bénéfice est compris dedans, on retourne false, sinon, on retourne ce qu'il faut lancer
 *
 * @return mixed (boolean || string) "bulle", "krach" ou false
 */
function should_trader_krach_or_bubble() {
    if(compteur_cooldown_animations <= 0) {
        if(forcer_evenement == 2) {
            return 'krash';
        } else if(forcer_evenement ==1) {
            return 'bulle';
        }
    }

    var quotient_temps = temps_absolu/temps_absolu_total;
    if(quotient_temps <0.8) {
        var coefficient_multiplicatif_benefice_max = 0.1 + quotient_temps * (9/8);
        var coefficient_multiplicatif_benefice_min = -0.1 + quotient_temps * (11/8);
    } else {
        var coefficient_multiplicatif_benefice_max = 1;
        var coefficient_multiplicatif_benefice_min = 1;
    }

    actuel_benefice_max = benefice_max * coefficient_multiplicatif_benefice_max;
    actuel_benefice_min = benefice_min * coefficient_multiplicatif_benefice_min;

    if(benefice > actuel_benefice_max) {
        return 'bulle';
    } else if(benefice < actuel_benefice_min) {
        return 'krach';
    } else {
        return false;
    }
}

function maj_prix_bulle() {
    for(var id in boissons)
    {
        if(boissons[id]['prix_vente_calcule'] - pas_bulle > boissons[id]['prix_init']) {
            boissons[id]['prix_vente_calcule'] = boissons[id]['prix_init'];
        } else {
            boissons[id]['prix_vente_calcule'] -= pas_bulle;
        }
    }
    localStorage.setItem('video_en_cours', 1);
    stat_evenement_bulle ++;
}
function maj_prix_krach() {
    for(var id in boissons)
    {
        if(boissons[id]['prix_vente_calcule'] + pas_krach < boissons[id]['prix_revient']) {
            boissons[id]['prix_vente_calcule'] = boissons[id]['prix_revient'];
        } else {
            boissons[id]['prix_vente_calcule'] += pas_krach;
        }
    }
    localStorage.setItem('video_en_cours', 2);
    stat_evenement_krash ++;
}

function do_event(event) {
    forcer_evenement = 0;

    if(event == 'bulle') {
        maj_prix_bulle();
    } else if(event == 'krach') {
        maj_prix_krach();
    } else {
        throw('wtf ? Il y a un autre event ??');
    }

    compteur_cooldown_animations = cooldown_animations;

    stat_evenement_bulle ++;

    mise_a_jour_bdd_ecran();
}

// fonction principale
/**
 * Cette fonction est appelée le plus souvent, et fait beaucoup de choses, d'ou le nom peu explicite.
 *
 * Notamment, elle calcule les nouveaux prix & bénifices.
 * Elle vérifie ensuite, qu'il ne faut pas lancer de bulle ou de krach.
 * Enfin, elle met à jour le tableau et les stats de l'administration.
 *
 * @param  xml_response Réponse xml à la requete sur data.php qui donne les ventes depuis le début du trader
 */
function fonction_principale(xml_response) {
    definition_nouveaux_prix_benefices(xml_response);

    var event = should_trader_krach_or_bubble();
    if(event !== false) {
        do_event(event);
    }

    document.getElementById('benef_tps_reel').innerHTML = 'Bénéfice en temps réel : ' + benefice + 'c';
    document.getElementById('benefice').innerHTML = ' ' + benefice + 'c';
    document.getElementById('benefice_min').innerHTML = ' ' + actuel_benefice_max + 'c';
    document.getElementById('benefice_max').innerHTML = ' ' + actuel_benefice_min + 'c';

    update_affichage_tableau();
    update_stats();
    update_graphiques();
    update_debug();
}

// Mise à jour de la bdd et de l'affichage
function mise_a_jour_bdd_ecran() {
    if(typeof(mise_a_jour_compteur_function) != "undefined")
        clearInterval(mise_a_jour_compteur_function);
    if(typeof(requete_transactions_function) != "undefined")
        clearInterval(requete_transactions_function);

    for(var id in boissons) {
        boissons[id]['prix_vente_reel'] = Math.round(boissons[id]['prix_vente_calcule']);
    }

    requete_mise_a_jour(boissons);

    localStorage.setItem('boissons', JSON.stringify(boissons));
    localStorage.setItem('changement_affichage', 1);
}

// envoi des requêtes AJAX pour mettre a jour la bdd
function requete_mise_a_jour(articles)
{
    var articles_data = {};
    for(var id in articles) {
        articles_data[id] = articles[id]['prix_vente_reel'];
    }

    var data = {articles: articles_data};

    $.post("processing/update_db.php", data, update_done);
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
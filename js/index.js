function selectionArticle(element)
{
    var tableau = document.getElementById('choix_prix');

    // Si on coche la checkbox
    if(element.checked)
    {
        console.log(element);
        console.log(element.getAttribute('name'));
        var id   = element.getAttribute('value');
        var nom  = element.getAttribute('name');
        var prix = element.getAttribute('prix');

        var ligne = tableau.insertRow(-1);

        var colonne = ligne.insertCell(0);
        colonne.innerHTML = id;

        var colonne = ligne.insertCell(1);
        colonne.innerHTML = nom;

        var colonne = ligne.insertCell(2);
        colonne.innerHTML = '<input class="form-control" type="number" id="prix_initial' + id + '" value="' + prix + '">';

        var colonne = ligne.insertCell(3);
        colonne.innerHTML = '<input class="form-control" type="number" id="prix_min' + id + '">';

        var colonne = ligne.insertCell(4);
        colonne.innerHTML = '<input class="form-control" type="number" id="prix_revient' + id + '">';
    }
    // Si on la décoche
    else
    {
        for(var i = 0; i < tableau.rows.length; i++)
        {
            if(tableau.rows[i].cells[0].innerHTML == element.getAttribute('value'))
            {
                // On supprime la ligne associée
                tableau.deleteRow(i);
                break;
            }
        }
    }
}

function appui_bouton()
{
    // Si on n'arrive pas à sauvegarder, on lance une alerte
    if(sauvegarder() != null)
    {
        alert(sauvegarder());
    }
    // Si on a réussi à sauvegarder tout, on lance les pages associées
    else
    {
        location.href="ecran.php";
        window.open('administration.php', '_self');
    }
}

function sauvegarder()
{
    var boissons = {};
    var tableau = document.getElementById('choix_prix');

    console.log(tableau.rows.length);

    if(tableau.rows.length-1 <2){return "Veuillez mettre au moins 2 articles en bourse";}

    for(var i = 1; i < tableau.rows.length; i++)
    {
        // On récupère toutes les valeurs de l'élément
        var id           = Number(tableau.rows[i].cells[0].innerHTML);
        var nom          = tableau.rows[i].cells[1].innerHTML;
        var prix_initial = Number(document.getElementById("prix_initial" + id).value);
        var prix_minimal = Number(document.getElementById("prix_min" + id).value);
        var prix_revient = Number(document.getElementById("prix_revient" + id).value);

        // Vérification des champs vides
        if(prix_minimal == ""){return "Veillez saisir un prix minimal (" + nom + ")";}
        if(prix_revient == ""){return "Veillez saisir un prix maximal (" + nom + ")";}

        // Ajout d'une ligne au tableau
        var boisson = {};
        boisson["nom"]                = nom;
        boisson["prix_vente_calcule"] = prix_initial;
        boisson["prix_vente_reel"]    = prix_initial;
        boisson["prix_init"]          = prix_initial;
        boisson["prix_revient"]       = prix_revient;
        boisson["prix_min"]           = prix_minimal;
        boisson["nb_ventes"]          = 0;
        boisson["recette"]            = 0;
        boisson["max_une_fois"] = 0;

        boissons[id] = boisson;
    }

    // Vérification des champs vides et des problèmes
    if(document.getElementById("benefice_max").value == ""){return "Veillez saisir un benefice maximal";}
    if(document.getElementById("benefice_min").value == ""){return "Veillez saisir un benefice minimal";}
    if(parseInt(document.getElementById("benefice_min").value, 10) >= parseInt(document.getElementById("benefice_max").value,10)){return "Le benefice minimal doit être inférieur à celui maximal";}
    if(document.getElementById("heure_debut").value == ""){return "Veillez saisir une heure de début";}
    if(document.getElementById("date_debut").value == ""){return "Veillez saisir une date de début";}
    if(document.getElementById("heure_fin").value == ""){return "Veillez saisir une heure de fin";}
    if(document.getElementById("date_fin").value == ""){return "Veillez saisir une date de fin";}
    if(document.getElementById("date_fin").value < document.getElementById("date_debut").value){return "La date de fin doit être supérieure à celle de début";}
    else if(document.getElementById("heure_fin").value <= document.getElementById("heure_debut").value){return "L'heure de fin doit être supérieure à celle de début";}

    // Récupération des valeurs diverses
    var benefice_max = Number(document.getElementById("benefice_max").value);
    var benefice_min = Number(document.getElementById("benefice_min").value);

    var date = document.getElementById("date_debut").value;
    var heure = document.getElementById("heure_debut").value;

    var heure_debut = new Date(date + " " + heure + ":00");

    if(heure_debut< new Date()) {return "Choisissez une date de début de trader postérieure à la date actuelle"};

    var heure_debut_pour_php = date + " " + heure + ":00";

    var date = document.getElementById("date_fin").value;
    var heure = document.getElementById("heure_fin").value;

    var heure_fin = new Date(date + " " + heure + ":00");

    // var benefice_max = Number(document.getElementById("benefice_max").value);
    // var benefice_min = Number(document.getElementById("benefice_min").value);

    // var open_trader_date = document.getElementById("open_trader").value;

    // var heure_debut = new Date(open_trader_date);
    // var heure_debut_pour_php = open_trader_date;

    // var close_trader_date = document.getElementById("heure_fin").value;

    // var heure_fin = new Date(close_trader_date);

    // Sauvegarde des valeurs dans le stockage local
    localStorage.setItem('boissons', JSON.stringify(boissons));
    localStorage.setItem('benefice_max', benefice_max);
    localStorage.setItem('benefice_min', benefice_min);
    localStorage.setItem('heure_debut', heure_debut);
    localStorage.setItem('heure_debut_pour_php', heure_debut_pour_php);
    localStorage.setItem('heure_fin', heure_fin);
    localStorage.setItem('changement_affichage', 0);
    localStorage.setItem('video_en_cours', 0);
    localStorage.setItem('final_stats', false);
    return null;
}

// $('#trader_dates input').click(function() {
//     $(this).next('span').click();
// });

// $('#open_trader_div').datetimepicker({
//     sideBySide: true
// });
// $('#close_trader_div').datetimepicker({
//     sideBySide: true,
//     useCurrent: false //Important! See issue #1075
// });
// $("#open_trader_div").on("dp.change", function (e) {
//     $('#close_trader_div').data("DateTimePicker").minDate(e.date);
// });
// $("#close_trader_div").on("dp.change", function (e) {
//     $('#open_trader_div').data("DateTimePicker").maxDate(e.date);
// });

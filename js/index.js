function selectionArticle(element)
{
    var tableau = document.getElementById('choix_prix');

    // Si on coche la checkbox
    if(element.checked)
    {
        var id   = element.getAttribute('value');
        var nom  = element.getAttribute('nom');
        var prix = element.getAttribute('prix');

        var ligne = tableau.insertRow(-1);

        var colonne = ligne.insertCell(0);
        colonne.innerHTML = id;

        var colonne = ligne.insertCell(1);
        colonne.innerHTML = nom;

        var colonne = ligne.insertCell(2);
        colonne.innerHTML = prix;

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
        window.open('administration.php', 'pop', '');
    }
}

function sauvegarder()
{
    var boissons = {};
    var tableau = document.getElementById('choix_prix');

    for(var i = 1; i < tableau.rows.length; i++)
    {
        // On récupère toutes les valeurs de l'élément
        var id           = tableau.rows[i].cells[0].innerHTML;
        var nom          = tableau.rows[i].cells[1].innerHTML;
        var prix_initial = tableau.rows[i].cells[2].innerHTML;
        var prix_minimal = document.getElementById("prix_min" + id).value;
        var prix_revient = document.getElementById("prix_revient" + id).value;

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
    var benefice_max = document.getElementById("benefice_max").value;
    var benefice_min = document.getElementById("benefice_min").value;
    var heure_debut  = document.getElementById("date_debut").value + " " + document.getElementById("heure_debut").value + ":00";
    var heure_fin    = document.getElementById("date_fin").value + " " + document.getElementById("heure_fin").value + ":00";

    // Sauvegarde des valeurs dans le stockage local
    localStorage.setItem('boissons', JSON.stringify(boissons));
    localStorage.setItem('benefice_max', benefice_max);
    localStorage.setItem('benefice_min', benefice_min);
    localStorage.setItem('heure_debut', heure_debut);
    localStorage.setItem('heure_fin', heure_fin);
    return null;
}
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
    if(sauvegarder() == false)
    {
        alert("Veillez saisir tous les champs");
    }
    // Si on a réussi à sauvegarder tout, on lance les pages associées
    else
    {

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
        if(prix_minimal == ""){return false;}
        if(prix_revient == ""){return false;}

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

    

    alert(JSON.stringify(boissons));
    return true;
}
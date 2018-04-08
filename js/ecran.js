var lecteur_video1 = document.querySelector('#alert_video1');
var lecteur_video2 = document.querySelector('#alert_video2');


// On cache l'écran d'alerte video
document.getElementById("alert_info1").style.display = 'none';
document.getElementById("alert_info2").style.display = 'none';
lecteur_video1.pause();
lecteur_video2.pause();


// A la fin d'une animation video, on cache l'ecran d'alerte
lecteur_video1.addEventListener('ended', function(e) {
    document.getElementById("alert_info1").style.display = 'none';
    localStorage.setItem('video_en_cours', 0);
});
lecteur_video2.addEventListener('ended', function(e) {
    document.getElementById("alert_info2").style.display = 'none';
    localStorage.setItem('video_en_cours', 0);
});

setInterval(mise_a_jour, 100);

changement_affichage();


function mise_a_jour()
{
    // Mise à jour du décompte
    document.getElementById("decompte").innerHTML = localStorage.getItem('rafraichissement');

    // Consigne de mise à jour de l'affichage
    if(localStorage.getItem('changement_affichage') == 1){
        changement_affichage();
        localStorage.setItem('changement_affichage', 0);
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
}


function changement_affichage(argument)
{
    var boissons = JSON.parse(localStorage.getItem('boissons'));
    var i = 0;
    for(var id in boissons)
    {
        prix = boissons[id]['prix_vente_reel'];
        ancien_prix = document.getElementById("p" + i).innerHTML.replace('€','').replace('.','');

        if(prix < ancien_prix)
        {
            // Si le prix a baissé
            document.getElementById("n" + i).innerHTML = "<i class='up'>⯆</i> " + boissons[id]['nom'];
            document.getElementById("q" + i).innerHTML = "-" + ((ancien_prix - prix)/100).toFixed(2) + "€";
        }
        else if(prix > ancien_prix)
        {
            // Si le prix a augmenté
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
}

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
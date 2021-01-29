let mymap; // Variable qui permettra de stocker la carte
let marqueur; // Variable qui permettra de stocker le nouveau marqueur

let TableauEmplacements; // tableau des emplacement 
let TableauMarqueur = [];// Variable qui permettra de stocker les marqueur
let icone = []; // Variable qui permettra de stocker les icone des marqueur
let villes

// On attend que le DOM soit chargé
window.onload = () => {
    
    // Nous initialisons la carte et nous la centrons sur la mairie 
    mymap = L.map('detailsMap').setView([48.61015, 7.49662], 17)
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    //L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        attribution: 'Carte fournie par OpenStreetMap.fr',
        minZoom: 16,
        maxZoom: 20
    }).addTo(mymap);

     // On écoute le clic sur la carte et on lance la fonction "mapClickListen"
     mymap.on('click', mapClickListen);

    // JPP cree une liste de marqueur pour Mairie / entre / parking / toilette / restoration / zone 1-4-*
    // On personnalise le marqueur 
//    var icone = L.icon({
//        iconUrl: "images/icone.png",
//        iconSize: [50, 50],
//        iconAnchor: [25, 50],
//        popupAnchor: [0, -50]
//    });

    // On personnalise le marqueur 
        var icone = L.icon({
            iconUrl: "images/icone.png",
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        })
        var icone0 =L.icon({
            iconUrl: "images/marker-icon0.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41]
        });
        var icone1 = L.icon({
           iconUrl: "images/marker-icon1.png",
           iconSize: [25, 41],
           iconAnchor: [12, 41],
           popupAnchor: [0, -41]
       });
        var icone2 = L.icon({
            iconUrl: "images/marker-icon2.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41]
        });
   // on met les icone dans un tableau
  // icones={icone,icone1,icone2};
   icones=[icone,icone1,icone2];
   
    // lire les information de la base de donne en AJAX 
    let donnees; // les donne a retourner 
    let xmlhttp_Get = new XMLHttpRequest();
    // on definut l'URL de L'API et on l'appel
    xmlhttp_Get.open("GET","http://192.168.0.7/demo/osm/api/brocante/liste.php"); // JPPserveur 
    xmlhttp_Get.send(null);

    xmlhttp_Get.onreadystatechange = () =>{
      // La transaction est terminée ?
      if(xmlhttp_Get.readyState==4){ 
        // Si la transaction est un succès
        if(!(xmlhttp_Get.status ==200)){
            // On affiche le code d'erreur deans la console 
            console.log(xmlhttp.statusText);
        }else{
            // On traite les données reçues
            donnees = JSON.parse (xmlhttp_Get.responseText); // deserialisees les donnees
            // rendre les donner reutilisable 
            TableauEmplacements = donnees.emplacement;

            //gestion de l'affichage des emplacament 
            if(TableauEmplacements != null){
                // On boucle sur les données (ES8)
                //Object.entries(TableauEmplacements).forEach(emplacement => {
                // Ici j'ai un seul emplacement
                //    console.table(emplacement);
                    //TableauMarqueur[]
                //})
                console.log("********  for --- de l'affichage des emplacament ***********");
                for(var i=0 ; i<TableauEmplacements.length; i++){
                    var emplacement = TableauEmplacements[i];
                    // Ici j'ai un seul emplacement et je le rajoute dans un tableau de marqueur 
                    TableauMarqueur[i] = L.marker([emplacement.lat,emplacement.lon],{
                        icon: icones[emplacement.zone]//.alt="totot"
                        //,title = "totot"
                        //,dragstart(mapClickDragstart)
                        ,draggable: true
                    }).addTo(mymap);
                    TableauMarqueur[i].bindPopup("<p>"+emplacement.nom+"<p>")
                    
/// dell                    console.log("*******************************************************");
/// dell                   console.log(i)
/// dell                   console.table(emplacement);
/// dell               console.log("==================================================================");
/// dell               console.table(TableauMarqueur);
                }
            }
            // fin gestion de l'affichage des emplacament
            donnees = donnees.emplacement;
            console.log("********  fin gestion de l'affichage des emplacament ***********")
            
           //S console.table(donnees); //.emplacement verifie les donnees serialisees
            console.table(TableauEmplacements); //.emplacement verifie les donnees serialisees
            console.log("********  func API 3 ***********")
            //return donnees//.emplacement;
         }
      }
    } 
    
    
    /////////////////////////////////////////
   console.log("********  MAIN 0 ***********");
   console.table(TableauEmplacements); //.emplacement verifie les donnees serialisees
   console.log("********  MAIN 1 ***********");  



   // totototot=3
    villes = {
//        "KIRCHHEIM Mairie2": { "lat": 48.609550675531295, "lon": 7.496463060379029 }
//                ,"Entre 1 ": { "lat": 48.61719362882016, "lon": 7.50194549560547 }
//                ,"Entre 2": { "lat": 48.60778784416136, "lon": 7.493737936019898 }
//                ,"Quimper": { "lat": 48.60691527306896, "lon": 7.496350407600404 }
//                ,"Bayonne": { "lat": 43.500, "lon": -1.467 }
    };

    //console.table(villes);
 
    var tableauMarqueurs = [];



    // lire les information de la base de donne en AJAX --------------------------------------------------------------------
///   let xmlhttp = new XMLHttpRequest();
///
///    //xmlhttp.open("GET","http://192.168.0.7/demo/osm/api/brocante/liste.php"); // JPPserveur 
///    //xmlhttp.send(null);
///    xmlhttp.onreadystatechange = () =>{
///        // La transaction est terminée ?
///        if(xmlhttp.readyState==4){
///            // Si la transaction est un succès
///            if(!(xmlhttp.status ==200)){
///                // On affiche le code d'erreur deans la console 
///                console.log(xmlhttp.statusText);
///            }else{
///                // On traite les données reçues
///                //console.log(xmlhttp.responseText); //verifie la connextion a l'api
///                let donnees = JSON.parse (xmlhttp.responseText);
///               // console.log(donnees); //verifie les donnees serialisees
///               // console.table(donnees.emplacement); //verifie les donnees serialisees
/// /// transposition ok 
///                if(donnees != null){
///                    // On boucle sur les données (ES8)
///                    Object.entries(donnees.emplacement).forEach(emplacement => {
///                    // Ici j'ai un seul emplacement
///                    //console.table(emplacement[1]); //verifie l'info de l'objet
///                    //console.log(emplacement[1].nom); //verifie l'info de l'objet
///
///                    //    let marker = L.marker([emplacement[1].lat,emplacement[1].lon]).addTo(mymap);
///
///                    // On met le popup
///                    //marker.bindPopup("<p>"+emplacement[1].nom+"</p>");
///
///                    // On crée le marqueur et on lui attribue une popup
///                   // var marqueur = L.marker([villes[ville].lat, villes[ville].lon], {icon: icone}); //.addTo(mymap); Inutile lors de l'utilisation des clusters
///                  //  marqueur.bindPopup("<p>"+ville+"</p>");
///
///                    });
///                }
///            }
///        }
///    }
///
///    xmlhttp.open("GET","http://192.168.0.7/demo/osm/api/brocante/liste.php"); // JPPserveur 
///
///    xmlhttp.send(null);
///   /// lire les information de la base de donne en AJAX --------------------------------------------------------------------
   

    // rechercher le gps par l'adresser 
    document.querySelector("#adresse").addEventListener("blur",getCity);

    var marqueurs = L.markerClusterGroup();

    
                // On parcourt les différentes villes
                for(ville in villes){
                    // On crée le marqueur et on lui attribue une popup
                    var marqueur = L.marker([villes[ville].lat, villes[ville].lon], {
                        icon: icone//},{
                        // On rend le marqueur déplaçable
                        ,draggable: true
                        ,sourceTarget : 24
                        }
                    );

                    marqueur.on('dragend', function(e) {
                        console.log(e)
                        pos = e.target.getLatLng();
                        document.querySelector("#lat").value=pos.lat;
                        document.querySelector("#lon").value=pos.lng;
                    });
                         //.addTo(mymap); Inutile lors de l'utilisation des clusters
 //                   var marqueur = L.marker([villes[ville].lat, villes[ville].lon]); //.addTo(mymap); Inutile lors de l'utilisation des clusters
                    marqueur.bindPopup("<p>"+ville+"</p>");
                    marqueurs.addLayer(marqueur); // On ajoute le marqueur au groupe
    
                    // On ajoute le marqueur au tableau
                    tableauMarqueurs.push(marqueur);
                    //console.log(tableauMarqueurs);
                    //console.table(tableauMarqueurs[1]); //verifie l'info de l'objet
                }
                // On regroupe les marqueurs dans un groupe Leaflet
                var groupe = new L.featureGroup(tableauMarqueurs);
    
                // On adapte le zoom au groupe
                //carte.fitBounds(groupe.getBounds().pad(0.5));
    
                mymap.addLayer(marqueurs);
    
                console.log("********  MAIN 4 ***********");
                console.table(TableauEmplacements);
                console.log("********  MAIN 5 ***********");


}

function mapClickDragstart(e) {
    console.log(e)
}    

/**
 * Cette fonction se déclenche au clic, crée un marqueur et remplit les champs latitude et longitude
 * @param {event} e 
 */
function mapClickListen(e) {
console.log(e)

    // On récupère les coordonnées du clic
    pos = e.latlng
    console.log(pos)
    // On crée un marqueur
    addMarker(pos)

    // On affiche les coordonnées dans le formulaire
    document.querySelector("#lat").value=pos.lat
    document.querySelector("#lon").value=pos.lng
}

/**
 * Ajoute un marqueur sur la carte
 * @param {*} pos 
 */
function addMarker(pos){
  //  let marqueur = L.marker(pos) sera declare en variable global

    // On vérifie si le marqueur existe déjà
    if (marqueur != undefined) {
        // Si oui, on le retiresS
        mymap.removeLayer(marqueur);
    }

    // On crée le marqueur aux coordonnées "pos"
    marqueur = L.marker(
        pos,  {
            // On rend le marqueur déplaçable
            draggable: true
        }
    )

    // On écoute le glisser/déposer et on met à jour les coordonnées
    marqueur.on('dragend', function(e) {
        pos = e.target.getLatLng();
        document.querySelector("#lat").value=pos.lat;
        document.querySelector("#lon").value=pos.lng;
    });
    // On ajoute le marqueur
    marqueur.addTo(mymap)
}


/**
 * Récupérer les coordonnées de l'adresse et placer le marqueur
 */
function getCity(){
    // On "fabrique" l'adresse complète (des vérifications préalables seront nécessaires)
    let adresse = document.querySelector("#adresse").value + ", " + document.querySelector("#cp").value+ " " + document.querySelector("#ville").value;

    // console.log(adresse)
    // On initialise la requête Ajax
    const xmlhttp = new XMLHttpRequest

    // On ouvre la requête
    xmlhttp.open('get', `https://nominatim.openstreetmap.org/search?q=${adresse}&format=json&addressdetails=1&limit=1&polygon_svg=1`)

    // On détecte les changements d'état de la requête
    xmlhttp.onreadystatechange = () => {
        // Si la requête est terminée
        if(xmlhttp.readyState == 4){
            // Si nous avons une réponse
            if(xmlhttp.status == 200){
                // On récupère la réponse
                let response = JSON.parse(xmlhttp.response)

                //console.log(response)

                // On récupère la latitude et la longitude
                let lat = response[0]['lat']
                let lon = response[0]['lon']

                // On écrit les valeurs dans le formulaire
                document.querySelector("#lat").value= lat;
                document.querySelector("#lon").value= lon;

                // On crée le marqueur
                pos = [lat, lon];
                addMarker(pos);

                // On centre la carte sur l'adresse
                mymap.setView(pos, 18);
            }
        }
    }

    // On envoie la requête
    xmlhttp.send();
   
}

/** ********************************************************************************
 *  appel au methode API CRUD de emplacement
 */

/**
 * get  emplacement
 */
 function APIGetEmplacementAll(){
    // lire les information de la base de donne en AJAX 
    let donnees // les donne a retourner 
    let xmlhttp_Get = new XMLHttpRequest();
    // on definut l'URL de L'API et on l'appel
    xmlhttp_Get.open("GET","http://192.168.0.7/demo/osm/api/brocante/liste.php"); // JPPserveur 
    xmlhttp_Get.send(null);

    xmlhttp_Get.onreadystatechange = () =>{
      // La transaction est terminée ?
      if(xmlhttp_Get.readyState==4){ 
        // Si la transaction est un succès
        if(!(xmlhttp_Get.status ==200)){
            // On affiche le code d'erreur deans la console 
            console.log(xmlhttp.statusText);
        }else{
            // On traite les données reçues
            donnees = JSON.parse (xmlhttp_Get.responseText); // deserialisees les donnees
            TableauEmplacements = donnees.emplacement;

            donnees = donnees.emplacement;
            console.log("********  func API 2 ***********")
            
            console.table(donnees); //.emplacement verifie les donnees serialisees
            console.table(TableauEmplacements); //.emplacement verifie les donnees serialisees
            console.log("********  func API 3 ***********")
            //return donnees//.emplacement;
         }
      }
    }    
 }



 /**
  * APIGetObjet[All] 
  * └―┘└―┘└―――┘└―――┘
  *  |  |   |    └―> presision sur la methode 
  *  |  |   └―> l'Objet trater 
  *  |  └―> le type de methode 
  *  └―> definit que sa fait appel as des api REST
  * |l˾̶→
  *┘ꓔꟷꞱ└Ⱶ┘−│‐‒–‖Ⴡ―Ͱͱ˨˧˩˦˥
  *
  */
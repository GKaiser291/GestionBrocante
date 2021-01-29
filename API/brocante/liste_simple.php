<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$db_name = "agences";
$username = "root";
$password = "";
try{
  //  $db = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $db = new PDO("mysql:dbname=brocante_osm;host=127.0.0.1;port=3307"		//"mysql:host=localhost;dbname=blog_php", 
                                      ,"root"  //Nom d'utilisateur de la base de données
                                      ,"@ur01cR3m0");		 // Mot de passe de la base de données
                                      //	,array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC) // Type de renvoi (Tableau contenant les noms de colonne)				
			                         //	); 

    $db->exec("set names utf8");
}catch(PDOException $exception){
    echo "Erreur de connexion : " . $exception->getMessage();
}

$sql = "SELECT * FROM Emplacement";

// On prépare la requête
$query = $db->prepare($sql);

// On exécute la requête
$query->execute();

while($row = $query->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $agen = [
        "id" => $id,
        "nom" => $nom,
        "zone" => $zone,
        "lat" => $lat,
        "lon" => $lon,
    ];

    $tableauAgences['Emplacement'][] = $agen;
}

// On encode en json et on envoie
echo json_encode($tableauAgences);

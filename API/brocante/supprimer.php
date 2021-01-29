<?php
// Headers requis
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE"); //-> definit la metode de l'API REST 
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// On vérifie la méthode
if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    // On inclut les fichiers de configuration et d'accès aux données
    include_once './config/Database.php';
    include_once './models/Emplacement.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie les Emplacement
    $emplacement = new Emplacement($db);

    // On récupère les informations envoyées
    $donnees = json_decode(file_get_contents("php://input"));
  //  var_dump($donnees->id); 

   if(!empty($donnees->id))
   {
    $emplacement->id = $donnees->id;
    
    if($emplacement->supprimer()){
        // Ici la création a fonctionné
        // On envoie un code 201
        http_response_code(201);
        echo json_encode(["message" => "La suppression a été effectuée"]);
    }else{
        // Ici la création n'a pas fonctionné
        // On envoie un code 503
        http_response_code(503);
        echo json_encode(["message" => "La suppression n'a pas été effectuée"]);         
    }


   }
}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}
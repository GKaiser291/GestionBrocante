<?php
// Headers requis
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET"); //-> definit la metode de l'API REST 
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// On vérifie que la méthode utilisée est correcte
if($_SERVER['REQUEST_METHOD'] == 'GET'){
    // On inclut les fichiers de configuration et d'accès aux données
    include_once './config/Database.php';
    include_once './models/Emplacement.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie les Emplacement
    $emplacement = new Emplacement($db);

    // On récupère les données
    $stmt = $emplacement->lire();

    // On vérifie si on a au moins 1 agence
    if($stmt->rowCount() > 0){
        // On initialise un tableau associatif
        $tableauEmplacement = [];
        $tableauEmplacement['emplacement'] = [];

        // On parcourt les agences
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $empla = [
                "id" => $id,
                "nom" => $nom,
                "zone" => $zone,
                "lat" => $lat,
                "lon" => $lon,
            ];

            $tableauEmplacement['emplacement'][] = $empla;
        }

        // On envoie le code réponse 200 OK
        http_response_code(200);

        // On encode en json et on envoie
        echo json_encode($tableauEmplacement);
    }

}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}
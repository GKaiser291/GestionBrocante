<?php
class Emplacement{
    // Connexion
    private $connexion;
    private $table = "Emplacement";

    // object properties
    public $id;
    public $nom;
    public $zone;
    public $lat;
    public $lon;

    /**
     * Constructeur avec $db pour la connexion à la base de données
     *
     * @param $db
     */
    public function __construct($db){
        $this->connexion = $db;
    }

    /**
     * Lecture les Emplacements
     *
     * @return void
     */
    public function lire(){
        // On écrit la requête
        $sql = "SELECT * FROM " . $this->table;

        // On prépare la requête
        $query = $this->connexion->prepare($sql);

        // On exécute la requête
        $query->execute();

        // On retourne le résultat
        return $query;
    }

    /**
     * Lecture un Emplacement
     *
     * @return void
     */
    public function lireUn(){
        // On écrit la requête
        // JPP a metre a jour Y 0:41:54
        $sql = "SELECT c.nom as categories_nom, p.id, p.nom, p.description, p.prix, p.categories_id, p.created_at FROM " . $this->table . " p LEFT JOIN categories c ON p.categories_id = c.id WHERE p.id = ? LIMIT 0,1";

        // On prépare la requête
        $query = $this->connexion->prepare( $sql );

        // On attache l'id
        $query->bindParam(1, $this->id);

        // On exécute la requête
        $query->execute();

        // on récupère la ligne
        $row = $query->fetch(PDO::FETCH_ASSOC);

        // On hydrate l'objet
        $this->id = $row['id'];
        $this->nom = $row['nom'];
        $this->zone = $row['zone'];
        $this->lat = $row['lat'];
        $this->lon = $row['lon'];
    }

    /**
     * Créer un produit
     *
     * @return void
     *
     */
    public function creer(){
 
        // Ecriture de la requête SQL en y insérant le nom de la table
        $sql = "INSERT INTO " . $this->table . " SET nom=:nom, zone=:zone, lat=:lat, lon=:lon";
 
        // Préparation de la requête
        $query = $this->connexion->prepare($sql);

 
        // Ajout des données protégées ( contre les injections ) 
        $query->bindParam(":nom", htmlspecialchars(strip_tags($this->nom)));
        $query->bindParam(":zone", htmlspecialchars(strip_tags($this->zone)));
        $query->bindParam(":lat", htmlspecialchars(strip_tags($this->lat)));
        $query->bindParam(":lon", htmlspecialchars(strip_tags($this->lon)));
 
         // Exécution de la requête
        if($query->execute()){
            return true;
        }
        return false;
    }

    /**
     * Mettre à jour un produit
     *
     * @return void
     */
    public function modifier(){
        // On écrit la requête
        $sql = "UPDATE " . $this->table . " SET nom=:nom, zone=:zone, lat=:lat, lon=:lon WHERE id=:id";
        
        // On prépare la requête
        $query = $this->connexion->prepare($sql);
 
        // Ajout des données protégées ( contre les injections ) 
        $query->bindParam(":id", htmlspecialchars(strip_tags($this->id)));
        $query->bindParam(":nom", htmlspecialchars(strip_tags($this->nom)));
        $query->bindParam(":zone", htmlspecialchars(strip_tags($this->zone)));
        $query->bindParam(":lat", htmlspecialchars(strip_tags($this->lat)));
        $query->bindParam(":lon", htmlspecialchars(strip_tags($this->lon)));
       
        //var_dump($query); 
        var_dump($this->id); 
             
        // On exécute
        if($query->execute()){
            return true;
        }
        return false;
    }


    /**
     * Supprimer un produit
     *
     * @return void
     */
    public function supprimer(){
        // On écrit la requête
        $sql = "DELETE FROM " . $this->table . " WHERE id = ?";

        // On prépare la requête
        $query = $this->connexion->prepare( $sql );

        // On sécurise les données
        $this->id=htmlspecialchars(strip_tags($this->id));

        // On attache l'id
        $query->bindParam(1, $this->id);

        // On exécute la requête
        if($query->execute()){
            return true;
        }
        
        return false;
    }
}
<?php
class Database{
    // Connexion à la base de données
    private $host = "localhost";
    private $db_name = "agences";
    private $username = "root";
    private $password = "";
    public $connexion;

    // getter pour la connexion
    public function getConnection(){

        $this->connexion = null;

        try{
            ///$this->connexion = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->connexion = new PDO("mysql:dbname=brocante_osm;host=127.0.0.1;port=3307"		//"mysql:host=localhost;dbname=blog_php", 
                                      ,"root"  //Nom d'utilisateur de la base de données
                                      ,"");		 // Mot de passe de la base de données
                                      //	,array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC) // Type de renvoi (Tableau contenant les noms de colonne)				
			                         //	); 

$this->connexion->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Erreur de connexion : " . $exception->getMessage();
        }

        return $this->connexion;
    }   
}
CREATE TABLE IF NOT EXISTS `Emplacement` (
  `id` tinyint(3) unsigned AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `zone` int(11) DEFAULT NULL,
  `lat` decimal(20,18) DEFAULT NULL,
  `lon` decimal(20,18) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Emplacement` 
(`nom`, `zone`, `lat`,`lon` ) VALUES
('KIRCHHEIM Mairie','0' ,'48.609550675531295','7.496463060379029' ),
('Entre 1','0' ,'48.61719362882016' ,'7.50194549560547' ),
('Entre 2','0' ,'48.60778784416136' ,'7.493737936019898' ),
('Entre 3','0' ,'48.60691527306896' ,'7.496350407600404' );

    
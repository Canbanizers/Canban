<?php

require_once '\library\php-activerecord-master\ActiveRecord.php';

//ActiveRecord wird initialisiert und die Datenbankklassen werden im Ordner 'models' gesucht
//
//TODO: Die Datenbank-Zugangsdaten müsst ihr natürlich anpassen
//
ActiveRecord\Config::initialize(function($cfg) {
            $cfg->set_model_directory('models');
            $cfg->set_connections(array(
                'development' => 'mysql://root:@localhost/canban'));
        });

/*
 * So legt man einen neuen User an
 */
//User::create(array(
//    'email' => 'muster@42.de',
//    'firstname' => 'M',
//    'lastname' => 'Mustermann',
//    'password' => '24',
//    'lastlogin' => date('Y-m-d H:i:S')
//));


/*
 * So legt man ein Ticket 
 * TODO: wip gehört nicht in die tickets.table, das gehört eher in die user.table
 */
//Tickets::create(array(
//    'state' => 1,
//    'content' => 'testticket',
//    'priority' => 7,
//    'creation_date' => date('Y-m-d H:i:S'),
//    'last_modify_date' => null
//));


/*
 * Jetzt schauen wir uns das ActiveRecord(AR)-Objekt an 
 * Beide Funktionen geben dieselben Objekt zurück
 * 
 * return: User-ActiveRecord
 */
//$ticket = Tickets::find_by_pk(4, array());
//$ticket2 = Tickets::find_by_id(4);    
//var_dump($ticket);
//var_dump($ticket2);


/*
 * Hat man das Objekt, kann man leicht die Fields auslesen
 * zur Erinnerung: $ticket2 ist unser AR-Objekt
 */
//$ticket_id = $ticket2->id;
//$ticket_content = $ticket2->content;
//var_dump($ticket_id);
//var_dump($ticket_content);       
/*
 * jetzt holen wir uns alle user
 */

//$all_users = User::find('all'); 
//
//foreach ($all_users as $one_user){
//    var_dump($one_user->firstname);
//}
        
/*
 * weitere keywords: um den letzten bzw. ersten user aus der table zu holen
 */
        
//   $last_user = User::find('last');
//   $first_user = User::find('first');
//   var_dump($last_user);
//   var_dump($first_user);
        
/*
 * Jetzt suchen wir direkt mit einem SQL-Statement
 */

//$users = User::find_by_sql("Select * From users");
//var_dump($users);

/*
 * Eigene SQL-Statements müsst aber als Funktion auslagern in die DB-Tabellenklasse,
 * sonst wird es zu unübersichtlich
 * siehe models/User.php
 */
        
//$users = User::getFirstnameById(13);
//if (isset($users)) {
//    var_dump($users);
//} else{
//    echo "ID doesn't exist.";
//}

/*
 * Argumente dem SQL-Statement übergeben
 */
//$users = User::find_by_sql("Select * From users WHERE id = ?", array('5'));
//var_dump($users);

/*
 * Daten manipulieren..
 */

$users = User::find_by_id(13);
$users->firstname = 'WhateverYouWant';
var_dump($users);

/*
 * ...und speichern
 */
$users->save();

/*
 * Die Doku findet ihr hier: http://www.phpactiverecord.org/projects/main
 */
?>
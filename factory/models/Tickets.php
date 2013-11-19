<?php

class Tickets extends ActiveRecord\Model{
    
    public static $table_name = 'tickets';
    public static $primary_key= 'id';
    
//    public function before_create(){
//        $this->priority = 2;
//    }
}

?>

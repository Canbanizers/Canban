<?php

class Author extends ActiveRecord\Model {

	static $pk = 'author_id';
	static $has_one = array(array('awesome_person', 'foreign_key' => 'author_id', 'primary_key' => 'author_id'),
		array('parent_author', 'class_name' => 'Author', 'foreign_key' => 'parent_author_id'));
	static $has_many = array(array('books'));
	static $belongs_to = array();
	static $setters = array('password');

	public function set_password($plaintext) {
		$this->encrypted_password = md5($plaintext);
	}

	public function set_name($value) {
		$value = strtoupper($value);
		$this->assign_attribute('name', $value);
	}
}

;
?>

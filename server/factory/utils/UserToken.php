<?php


class UserToken {

	public static function getToken(){
		$rand_arr = array();
		for($i = 0; $i < 10 ; $i++){
			$rand_arr[] = rand(1,10);
		}

		return implode('', $rand_arr);
	}
} 
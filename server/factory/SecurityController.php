<?php

class SecurityController {

	private $salt = '9Zq|3`CS{b=9_k0gwZz=4QwY~52BS5EI)h7dV>@0q[j{_Y`n.i$_ZbKP>we+&OJx';

	/**
	 * @param array $params
	 */
	public function checkCredentials(array $params) {

		if (!empty($params['email']) && !empty($params['password'])) {
			$email = $params['email'];
			$password_hash = md5($params['password'], $this->salt);
			$model = new ModelController();
			$model->execute('User', 'checkCredentials', $params);
		}
	}
}
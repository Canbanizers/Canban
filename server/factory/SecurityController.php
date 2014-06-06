<?php

require_once __DIR__ . DIRECTORY_SEPARATOR . 'models' . DIRECTORY_SEPARATOR . 'Users.php';
require_once(__DIR__ . '\ModelFactory.php');


class SecurityController
{
	/**
	 * @var ObserverInterface
	 */
	private $observer;

	/**
	 * @var
	 */
	private $user_id = null;

	/**
	 * @param ObserverInterface $observer
	 */
	public function __construct(ObserverInterface $observer)
	{
		$this->observer = $observer;
	}

	/**
	 * @param string $model
	 * @param string $req_method
	 * @param string $token
	 *
	 * @return bool
	 */
	public function hasPermission($model, $req_method, $token)
	{
		if('logins' === $model || ('users' ===  $model && ('create' === $req_method))) {
			return true;
		}
		$users_class = new Users();
		$usermodel = $users_class->findByToken($token);
		if(empty($usermodel)) {
			return false;
		}
		$this->user_id = $usermodel->id;
		return true;
	}

	/**
	 * @param string $model
	 * @param string $json
	 * @param string $req_method
	 * @param string $id
	 * @param string $since
	 */
	public function execute($model, $json, $req_method, $id, $since)
	{
		$modelfactory = new ModelFactory($this->user_id);
		$modelfactory->addObserver($this->observer);
		$modelfactory->execute($model, $json, $req_method, $id, $since);
	}
} 
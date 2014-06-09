<?php

/**
 * Interface SubjectInterface
 */
interface SubjectInterface {

	/**
	 * @param ObserverInterface $observer
	 */
	public function addObserver(ObserverInterface $observer);

	/**
	 * @param ObserverInterface $observer
	 */
	public function removeObserver(ObserverInterface $observer);

	/**
	 * @param $response
	 */
	public function notify($response);
} 
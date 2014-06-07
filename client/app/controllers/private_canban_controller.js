'use strict';

App.PrivateCanbanController = Ember.ObjectController.extend({
	/**
	 * logged in user
	 */
	user   : null,
	content: Ember.Object.create({}),

	/**
	 * if a user is logged in, this function will redirect him to his mainboard
	 */
	getData: function() {
		if (this.get('user') !== null) {
			this.send('saveTransition', 'board.show', 'Personal Board');
		} else {
			this.transitionToRoute('login');
		}
	}
});
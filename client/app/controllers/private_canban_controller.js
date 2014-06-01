'use strict';

App.PrivateCanbanController = Ember.ObjectController.extend({
	/**
	 * logged in user
	 */
	user   : null,
	content: Ember.Object.create({}),

	/**
	 * if a user is logged in, this function will load all of his existing data and redirect him to his mainboard
	 */
	getData: function() {
		var self = this;
		if (this.get('user') != null) {
			self.transitionToRoute('board.show', 'PersonalBoard');
		} else {
			this.transitionToRoute('login');
		}
	}//.property('user'),
});
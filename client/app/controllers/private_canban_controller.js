'use strict';

App.PrivateCanbanController = Ember.ObjectController.extend({
	/**
	 * logged in user
	 */
	user: null,
	content: Ember.Object.create({}),

	/**
	 * if a user is logged in, this function will load all of his existing data and redirect him to his mainboard
	 */
	getData: function() {
		var self = this;
		if(this.get('user') != null) {

			var tickets = null, boards = self.store.find('board');

			var model =  boards.then(function() {
				tickets = self.store.find('ticket');
				return tickets.then(function() {
					return {
						boardCount : boards.get('length'),
						ticketCount: tickets.get('length')
					};
				});
			});
			model.then(function() {
				self.set('model', model);
				self.transitionToRoute('board', 'Personal Board');
			});
		} else {
			this.transitionToRoute('login');
		}
	}//.property('user'),
});
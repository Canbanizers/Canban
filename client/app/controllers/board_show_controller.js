'use strict';
App.BoardShowController = Ember.ObjectController.extend({
	needs: ['board'],

	dummyTicket: null,

	/**
	 * If the current model of BoardShowController is a Mainboard this function returns
	 * all tickets of the user else it will just return the tickets belonging to the current model
	 */
	getDisplayTickets: function() {
		if (this.get('isMainboard')) {
			return this.store.find('ticket');
		} else {
			var self = this;
			return this.store.filter('ticket', function(ticket) {
				return ticket.get('board.id') === self.get('id') || ticket.get('board.parent.id') === self.get('id');
			});
		}
	}.property('tickets', 'children.@each.tickets'),

	actions: {
		/**
		 * persists ticket
		 * on an server error it tries to save again and on second error it displays an error message to the user
		 * @param ticket
		 */
		createTicket: function(ticket) {
			ticket.set('creation_date', moment().format(window.timestampFormat));
			var success = function(resp) {
			};
			var secondError = function(resp) {
				alert("Sorry, we have internal server errors and can't save your ticket at this moment.\n" +
					  "It will be gone on next page reload, so be sure to save your ticket content in a local file.");
			};
			var error = function(resp) {
				ticket.save().then(success, secondError);
			};
			ticket.save().then(success, error);
		},

		updateTicket: function(ticket) {
			ticket.set('last_modify_date', moment().format(window.timestampFormat));
			ticket.save();
		},

		deleteTicket: function(ticket) {
			ticket.deleteRecord();
			ticket.save();
		}
	}
});
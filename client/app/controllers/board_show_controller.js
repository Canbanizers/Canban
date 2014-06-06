'use strict';
App.BoardShowController = Ember.ObjectController.extend({
	needs: ['board'],

	dummyTicket: null,
        
        getDisplayTickets: function() {
            if('Personal_Board' === this.get('name')) {
                return this.store.find('ticket');
            } else {
                var self = this;
                return this.store.filter('ticket', function(ticket) {
                    return ticket.get('board.id') === self.get('id') || ticket.get('board.parent.id') === self.get('id');
                });
            }
        }.property('tickets', 'children.@each.tickets'),

	actions: {
		createTicket: function(ticket) {
			ticket.set('creation_date', moment().format(window.timestampFormat));
			var success = function(resp) {
			};
			var secondError = function(resp) {
				var serverError = -1, sqlState = -1, sqlError = -1, errorMessage = '';
				if (resp.hasOwnProperty('serverError')) {
					serverError = resp['serverError'];
				} 
				if (resp.hasOwnProperty('sqlState')) {
					sqlState = resp['sqlState'];
				}
				if (resp.hasOwnProperty('sqlError')) {
					sqlError = resp['sqlError'];
				}
				if (resp.hasOwnProperty('errorMessage')) {
					errorMessage = resp['errorMessage'];
				}
				alert("Sorry, we have internal server errors and can't save your ticket at this moment.\n" +
					  "It will be gone on next page reload, so be sure to save your ticket content in a local file.\n" +
					  "\n" + "serverError: " + serverError + "\n" + "sqlState: " + sqlState + "\n" + "sqlError: " +
					  sqlError + "\n" + "errorMessage: " + errorMessage);
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
'use strict';
App.BoardShowController = Ember.ObjectController.extend({
	needs: ['board'],

	dummyTicket: null,

	actions: {
		switchBoard : function(board) {
			this.transitionToRoute('board', board.id);
		},
		createTicket: function(ticket) {
			ticket.set('creation_date', moment().format(window.timestampFormat));
			var success = function(resp) {
			};
			var secondError = function(resp) {
				var serverError = -1, sqlState = -1, sqlError = -1, errorMessage = '';
				if (resp.hasOwnProperty('serverError')) {
					console.log('hasOwnProperty serverError');
					serverError = resp['serverError'];
				} else {
					console.log('hasNoOwnProperty serverError');
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
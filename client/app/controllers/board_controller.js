'use strict';
App.BoardController = Ember.ObjectController.extend({

	getTodo: function() {
		return this.get('tickets').filter(function(ticket) {
			return ticket.get('isTodo');
		});
	}.property('tickets.@each.isTodo'),

	getDoing: function() {
		return this.get('tickets').filter(function(ticket) {
			return ticket.get('isDoing');
		});
	}.property('tickets.@each.isDoing'),

	getDone: function() {
		return this.get('tickets').filter(function(ticket) {
			return ticket.get('isDone');
		});
	}.property('tickets.@each.isDone'),

	actions: {
		switchBoard: function(board) {
			this.transitionToRoute('board', board.id);
		}
	}
});
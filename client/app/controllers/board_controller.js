'use strict';
App.BoardController = Ember.ArrayController.extend({
	getTodo: function() {
		return this.filter(function(ticket) {
			return ticket.get('isTodo');
		});
	}.property('@each.isTodo'),
	getDoing: function() {
		return this.filter(function(ticket) {
			return ticket.get('isDoing');
		});
	}.property('@each.isDoing'),
	getDone: function() {
		return this.filter(function(ticket) {
			return ticket.get('isDone');
		});
	}.property('@each.isDone')
});
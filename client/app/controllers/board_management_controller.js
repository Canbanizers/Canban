'use strict';

App.BoardsManagementController = Ember.ArrayController.extend({
	boardCount: function() {
		return this.get('model.length');
	}.property('model.length'),

	ticketCount: function() {
		return this.get('model.@each.tickets.length');
	}.property('@each.tickets.length')
});
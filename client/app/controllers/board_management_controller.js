'use strict';

App.BoardsManagementController = Ember.ArrayController.extend({
	boardCount: function() {
		return this.get('model.length');
	}.property('model.length'),

	ticketCount: function() {
		var boards = this.get('model');
                var ticketCount = 0;
                boards.forEach(function(board) {       
                    ticketCount += board.get('ticketCount');
                });
                return ticketCount;
	}.property('@each.ticketCount')
});
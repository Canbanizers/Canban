'use strict';

App.BoardsManagementController = Ember.ArrayController.extend({
	/**
	 * @return model.length the total count of boards the user owns
	 */
	boardCount: function() {
		return this.get('model.length');
	}.property('model.length'),

	/**
	 * @return ticketCount the total ticket count of all boards of a user
	 */
	ticketCount: function() {
		var boards = this.get('model');
		var ticketCount = 0;
		boards.forEach(function(board) {
			ticketCount += board.get('ticketCount');
		});
		return ticketCount;
	}.property('@each.ticketCount')
});
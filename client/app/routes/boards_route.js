'use strict';

App.BoardsRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('board');
	},

	actions: {

		save: function(board) {
			board.save().then(function() {

			});
		},

		cancel: function(board) {
			board.rollback();
		}
	}
});
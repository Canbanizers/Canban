'use strict';

App.BoardsRoute = Ember.Route.extend({
	/**
	 * finds all boards beloging to the logedin user
	 *
	 * @returns {*}
	 */
	model: function() {
		return this.store.find('board');
	},

	actions: {

		/**
		 * saves a board
		 *
		 * @param board
		 */
		save: function(board) {
			board.save().then(function() {

			});
		},

		/**
		 * rollback a board
		 *
		 * @param board
		 */
		cancel: function(board) {
			board.rollback();
		}
	}
});
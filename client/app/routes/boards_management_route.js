'use strict';

App.BoardsManagementRoute = Ember.Route.extend({

	/**
	 * loads the model used by the BoardsRoute
	 *
	 * @returns {*|Object}
	 */
	model: function() {
		return this.modelFor('boards');
	},

	actions: {
		renderInfoWithController: function(controller) {
			this.render('board.info', {
				into      : 'boards.management',
				outlet    : 'content',
				controller: controller
			});

		},

		/**
		 * Switches to a board (type == null) or display the info/edit page for the board
		 *
		 * @param {Board extends DS.Model} board
		 * @param {String} type (info, edit, null)
		 */
		showBoard: function(board, type) {
			if (!type) {
				this.send('saveTransition', 'board.show', board.get('name'));
			} else {
				var controller = this.controllerFor('board.' + type);
				controller.set('model', board);
				this.send('renderInfoWithController', controller);
			}
		},

		/**
		 * creates a new board
		 */
		createBoard: function() {
			var board = this.store.createRecord('board', {
				name: '',
				wip : 0
			});
			this.send('showBoard', board, 'edit');
		},

		/**
		 * deletes the selectedboard
		 *
		 * @param board
		 */
		deleteBoard: function(board) {
			board.deleteRecord();
			board.save();
		}
	}
});
'use strict';

App.BoardsManagementRoute = Ember.Route.extend({
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

		showBoard: function(board, type) {
			if (!type) {
				this.send('saveTransition', 'board.show', board.get('name'));
			} else {
				var controller = this.controllerFor('board.' + type);
				controller.set('model', board);
				this.send('renderInfoWithController', controller);
			}
		},

		createBoard: function() {
			var board = this.store.createRecord('board', {
				name: '',
				wip : 0
			});
			this.send('showBoard', board, 'edit');
		},

		deleteBoard: function(board) {
			board.deleteRecord();
			board.save();
		}
	}
});
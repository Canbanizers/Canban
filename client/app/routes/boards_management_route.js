'use strict';

App.BoardsManagementRoute = Ember.Route.extend({
	toRender: null,

	model: function() {
		return this.store.find('board');
	},

	actions: {
		boardInfo: function(board) {
			var controller = this.controllerFor('board.info');
			controller.send('changeBoard', board);
			this.send('renderInfoWithController', controller);
		},

		boardSettings: function(board) {
			var controller = this.controllerFor('board.edit');
			controller.set('model', board);
			this.send('renderInfoWithController', controller);
		},

		renderInfoWithController: function(controller) {
			this.render('board.info', {
				into      : 'boards.management',
				outlet    : 'content',
				controller: controller
			});

		},
                
                showBoard: function(board) {
                    this.transitionTo('board.show', board.get('name'));
                }
	}
});
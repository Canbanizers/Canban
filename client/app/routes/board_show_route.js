App.BoardShowRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('board');
	},

	actions: {
		switchBoard: function(board) {
			this.send('saveTransition', 'board.show', board.get('name'));
		}
	}
});
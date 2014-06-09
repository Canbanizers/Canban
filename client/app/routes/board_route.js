App.BoardRoute = Ember.Route.extend({
	beforeModel: function() {
		var self = this;
		var boards = this.store.find('board');
		return boards.then(function() {
				if (boards.get('length') > 0) {
					return null;
				} else {
					var board = self.store.createRecord('board', {
						name: "Personal Board",
						wip: -1
					});
					return board.save();
				}
		});
	},
	model      : function(params) {
		var boardName = params.board_name.replace(/_/g, ' ');
		var board = this.store.find('board', {name: boardName}).then(function(boards) {
			return boards.content[0];
		});
		return board;
	},

	actions: {
		switchBoard: function(board) {
			this.send('saveTransition', 'board.show', board.get('name'));
		}
	}
});
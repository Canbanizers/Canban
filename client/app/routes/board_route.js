App.BoardRoute = Ember.Route.extend({
	/**
	 * if there are no boards belonging to the user loggedin this function will created a new "Personal Board"
	 * (the users Mainboard) and persist it before the model is loaded
	 *
	 * @returns {Promise|*}
	 */
	beforeModel: function() {
		var self = this;
		var boards = this.store.find('board');
		return boards.then(function() {
			if (boards.get('length') > 0) {
				return null;
			} else {
				var board = self.store.createRecord('board', {
					name: "Personal Board",
					wip : -1
				});
				return board.save();
			}
		});
	},

	/**
	 * loads the board with the name specified in the route param board_name
	 *
	 * @param params
	 * @returns {Promise|*}
	 */
	model: function(params) {
		var boardName = params.board_name.replace(/_/g, ' ');
		var board = this.store.find('board', {name: boardName}).then(function(boards) {
			return boards.content[0];
		});
		return board;
	},

	actions: {
		/**
		 * switches to a different board
		 * @param board
		 */
		switchBoard: function(board) {
			this.send('saveTransition', 'board.show', board.get('name'));
		}
	}
});
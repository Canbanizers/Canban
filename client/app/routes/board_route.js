App.BoardRoute = Ember.Route.extend({
	beforeModel: function() {
		var self = this;
		var store = this.store, boards = store.find('board'), tickets = null;
		return boards.then(function() {
			tickets = store.find('ticket');
			return tickets.then(function() {
				if (boards.get('length') > 0) {
					console.log(boards.get('length'));
					return null;
				} else {
					var board = self.store.createRecord('board', {
						name: "PersonalBoard"
					});
					return board.save().then(function() {
						return board
					})
				}
			})
		});
	},
	model      : function(params) {
		var board = this.store.find('board', {name: params.board_name}).then(function(boards) {
			return boards.content[0];
		});
		return board;
	}
});
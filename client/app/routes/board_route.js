App.BoardRoute = Ember.Route.extend({
	beforeModel: function() {
		var self = this;
		var boards = this.store.find('board');
		return Ember.RSVP.resolve(boards.then(function(boards) {
			if (!(boards.content.length > 0)) {
				var board = self.store.createRecord('board', {
					name: "Personal Board"
				});
				return board.save();
			}
		}));
	},
	model      : function(params) {
		var board = this.store.find('board', {name: params.board_name}).then(function(boards) {
			return boards.content[0];
		});
		return board;
	}
});
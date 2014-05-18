App.BoardRoute = Ember.Route.extend({
	beforeModel: function() {
		var self = this;
		var privateCanban = this.controllerFor('private_canban');
		if (privateCanban.get('model') && !(privateCanban.get('boardCount') > 0)) {
			var board = self.store.createRecord('board', {
				name: "Personal Board"
			});
			return board.save();
		} else {
			return null;
		}
	},
	model      : function(params) {
		var board = this.store.find('board', {name: params.board_name}).then(function(boards) {
			return boards.content[0];
		});
		return board;
	}
});
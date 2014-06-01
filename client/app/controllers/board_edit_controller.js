App.BoardEditController = Ember.ObjectController.extend({
	needs: ['boards'],
	info : false,

	getBoards: function() {
		var self = this;
		var boards = this.get('controllers.boards.model').filter(function(board) {
			console.log(board.get('id'));
			console.log(self.get('id'));
			return board.get('id') !== self.get('id');
		});
		boards.pushObject(null);
		return boards;
	}.property('controllers.boards.model', 'id')
});
App.BoardEditController = Ember.ObjectController.extend({
	needs: ['boards'],
	info : false,
        
	getBoards: function() {
		var self = this;
                var boards = [];
		boards.pushObject(null);
		var tempBoards = this.get('controllers.boards.model').filter(function(board) {
			return board.get('id') !== self.get('id');
		});
                tempBoards.forEach(function(board) {
                    boards.pushObject(board);
                });
		return boards;
	}.property('controllers.boards.model')
});
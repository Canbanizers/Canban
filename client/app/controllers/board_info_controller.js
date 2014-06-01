App.BoardInfoController = Ember.ObjectController.extend({
	needs   : ['boards'],
	info    : true,
	children: null,

	ticketCount: function() {
		return this.get('tickets.length');
	}.property('tickets.length'),

	getParent: function() {
		var parentID = this.get('parent');
		if (null !== parentID) {
			return this.store.find('board', parentID);
		}
		return null;
	}.property('parent'),

	getChildren: function() {
		var self = this;
		var children = this.get('children');
		if (null === children) {
			children = this.get('controllers.boards.model').filter(function(board) {
				return board.get('parent') == self.get('id');
			});
			this.set('children', children);
		}
		return children.get('length') > 0 ? children : null;
	}.property('controllers.boards.model', 'model'),

	actions: {
		changeBoard: function(board) {
			this.set('children', null);
			this.set('model', board);
		}
	}
});
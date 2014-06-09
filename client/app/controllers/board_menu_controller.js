App.BoardMenuComponent = Ember.Component.extend({
	tagName   : 'nav',
	classNames: ['board_menu'],

	board: null,

	actions: {
		createTicket : function() {
			this.sendAction('createTicket');
		},
		boardInfo    : function() {
			this.sendAction('showBoard', this.get('board'), 'info');
		},
		boardSettings: function() {
			this.sendAction('showBoard', this.get('board'), 'edit');
		},
		showBoard    : function() {
			this.sendAction('showBoard', this.get('board'));
		},
		deleteBoard  : function() {
			this.sendAction('deleteBoard', this.get('board'));
		}
	}
});
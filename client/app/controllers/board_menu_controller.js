App.BoardMenuComponent = Ember.Component.extend({
	tagName   : 'nav',
	classNames: ['board_menu'],

	board: null,

	actions   : {
		createTicket: function() {
			this.sendAction('createTicket');
		},
		boardInfo   : function() {
			this.sendAction('boardInfo', this.get('board'));
		},
		boardSettings: function() {
			this.sendAction('boardSettings', this.get('board'));
		},
                showBoard: function() {
                    this.sendAction('showBoard', this.get('board'));
                }
	}
});
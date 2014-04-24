App.BoardMenuComponent = Ember.Component.extend({
	tagName   : 'nav',
	classNames: ['board_menu'],
	actions   : {
		createTicket: function() {
			this.sendAction('createTicket');
		}
	}
});
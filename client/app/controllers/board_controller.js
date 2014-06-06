App.BoardController = Ember.ObjectController.extend({
	actions: {
		showCreateTicket: function() {
			this.send('addDummyTicket');
		},
		addDummyTicket  : function() {
			var board = this.get('model');
			var dummyTicket = this.store.createRecord('ticket', {
				board           : board,
				state           : 1,
				title           : '',
				content         : '',
				ticketNr        : 500,
				priority        : 0,
				creation_date   : null,
				last_modify_date: null
			});
			var tickets = board.get('tickets');
			tickets.pushObject(dummyTicket);
		}
	}
});
/**
 *
 * @type {*|void|Object}
 */
App.BoardController = Ember.ObjectController.extend({
	actions: {
		showCreateTicket: function() {
			this.send('addDummyTicket');
		},
		/**
		 * Adds a ticket that will be displayed on creation of a new ticket.
		 * Will be persisted or deleted corresponding to user interactions (save or cancel)
		 */
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
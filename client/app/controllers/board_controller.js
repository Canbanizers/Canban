'use strict';
App.BoardController = Ember.ObjectController.extend({

	dummyTicket: null,

	getTodo: function() {
		return this.get('tickets').filter(function(ticket) {
			return ticket.get('isTodo');
		});
	}.property('tickets.@each.isTodo'),

	getDoing: function() {
		return this.get('tickets').filter(function(ticket) {
			return ticket.get('isDoing');
		});
	}.property('tickets.@each.isDoing'),

	getDone: function() {
		return this.get('tickets').filter(function(ticket) {
			return ticket.get('isDone');
		});
	}.property('tickets.@each.isDone'),

	actions: {
		switchBoard      : function(board) {
			this.transitionToRoute('board', board.id);
		},
		showCreateTicket : function() {
			this.send('addDummyTicket');
		},
		addDummyTicket   : function() {
			console.log("BoardController.addDummyTicket()");
			var board = this.get('model');
			console.log(board);
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
		},
		saveTicket     : function(ticket) {
			ticket.save();
			//FIXME At the moment we need to save the board on every edit on its tickets., or the localstorage data will be corrupted. I will try to fix this soon.
			ticket.get('board').save();
		}
	}
});
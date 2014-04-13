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
		addDummyTicket   : function(state) {
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
			this.set('dummyTicket', dummyTicket);
			var tickets = board.get('tickets');
			tickets.pushObject(dummyTicket);
		},
		saveTicket       : function(ticket) {
			console.log('BoardShow: Received!');
			if (arguments.length === 1) {
				console.log('BoardShow: Sending update!');
				this.send('updateTicket', ticket);
			} else {
				console.log('BoardShow: Sending save!');
				this.send('saveDummyTicket');
			}
		},
		saveDummyTicket  : function() {
			console.log('Board: Receiving save!');
			var ticket = this.get('dummyTicket');
			console.log("dummyTicket");
			console.log(ticket);
			ticket.save();
			ticket.get('board').save();
		},
		removeDummyTicket: function() {
			var dummyTicket = this.get('dummyTicket');
			var board = this.get('model');
			var tickets = board.get('tickets');
			tickets.removeObject(dummyTicket);
			this.store.deleteRecord(dummyTicket);
		},
		updateTicket     : function(ticket) {
			ticket.save();
		}
	}
});
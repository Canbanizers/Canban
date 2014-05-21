App.PrivateCanbanRoute = Ember.Route.extend({
	loggedIn : true,
	model : function() {
		var self = this;
		if (this.get('loggedIn')) {
			return Ember.RSVP.resolve(self.store.find('ticket').then(function(ticketArray) {
				return self.store.find('board').then(function(boardArray) {
					return {
						boardCount : boardArray.content.length,
						ticketCount: ticketArray.content.length
					};
				});
			}));
		} else {
			return null;
		}
	},
	afterModel: function(model) {
		if (this.get('loggedIn')) {
			this.transitionTo('board', 'Personal Board');
		} else {
			this.transitionTo('signin');
		}
	}
});
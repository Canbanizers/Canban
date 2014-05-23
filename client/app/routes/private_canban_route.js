App.PrivateCanbanRoute = Ember.Route.extend({
	loggedIn: true,
	model : function() {
		var self = this;
		if (this.get('loggedIn')) {
			var users = self.store.find('user'), tickets = null, boards = null;

			var model = users.then(function() {
				boards = self.store.find('board');
				return boards.then(function() {
					tickets = self.store.find('ticket');
					return tickets.then(function() {
						return {
							boardCount : boards.get('length'),
							ticketCount: tickets.get('length')
						};
					});
				});
			});
			return Ember.RSVP.resolve(model);
		} else {
			return null;
		}
	},
	setupController: function(model) {
		if (this.get('loggedIn')) {
			this.transitionTo('board', 'Personal Board');
		} else {
			this.transitionTo('login');
		}
	}
});
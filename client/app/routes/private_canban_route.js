var logedIn = false;

App.PrivateCanbanRoute = Ember.Route.extend({
	beforeModel: function () {
		if (logedIn) {
			this.transitionTo('board', 1);
		} else {
			this.transitionTo('login');
		}
	beforeModel: function() {
		if (!this.controllerFor('login').get('loggedInUser')) {
			this.transitionTo('login');
		}
	}
});


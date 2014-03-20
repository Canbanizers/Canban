App.PrivateCanbanRoute = Ember.Route.extend({
	beforeModel: function() {
		if (!this.controllerFor('login').get('loggedInUser')) {
			this.transitionTo('login');
		}
	}
});
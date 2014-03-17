var logedIn = true;

App.PrivateCanbanRoute = Ember.Route.extend({
	beforeModel: function () {
		if (logedIn) {
			this.transitionTo('board', 1);
		} else {

		}
	}
});


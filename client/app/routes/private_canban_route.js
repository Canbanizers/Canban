App.PrivateCanbanRoute = Ember.Route.extend({
	/**
	 * if user is logged in he will be redirected to his mainboard, if not he will be transfer back to login
	 */
	renderTemplate: function() {
		if(!this.controllerFor('private_canban').get('user')) {
			this.transitionTo('login');
		} else {
			this.transitionTo('board', 'Personal Board');
		}
	}
});
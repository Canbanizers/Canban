App.UserRoute = Ember.Route.extend({
	model: function() {

		/**
		 * route should use the model of the PrivateCanbanRouter (logged in user)
		 */
		return this.controllerFor('private_canban').get('user');
	}
});
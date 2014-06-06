App.PrivateCanbanRoute = Ember.Route.extend({
	/**
	 * if user is logged in he will be redirected to his mainboard, if not he will be transfer back to login
	 */
	renderTemplate: function() {
		if(!this.controllerFor('private_canban').get('user')) {
			this.transitionTo('login');
		} else {
			this.transitionTo('board.show', 'Personal Board');
		}
	},
	actions: {
		/**
		 * unsets the token which indicates if the user is logged in and saves the user model
		 * afterwards he will be redirected to login page
		 */
		logout: function(){
			var user = this.controllerFor('private_canban').get('user');
			user.set('token', null);
			user.save();
			window.location = 'http://localhost/canban/client/debug';
		}
	}
});
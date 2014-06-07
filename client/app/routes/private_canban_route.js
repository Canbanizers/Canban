App.PrivateCanbanRoute = Ember.Route.extend({
	/**
	 * if user is logged in he will be redirected to his mainboard, if not he will be transfer back to login
	 */
	renderTemplate: function() {
		if(!this.controllerFor('private_canban').get('user')) {
			// example for redirecting to another page then login from the beginning: 
			// this.transitionTo('boards.management');
			this.transitionTo('login');
		} else {
			this.send('saveTransition', 'board.show', 'Personal Board');
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
			var self = this;
			user.save().then(function() {
				self.store.unloadAll('board');
				self.store.unloadAll('ticket');
				self.store.unloadAll('user');
				self.transitionTo('login');
				}, function() {
					console.log('##### ERROR ON LOGOUT! #####')
				});
		},

		/**
		 * replaces all whitespaces in param before transitioning to target
		 * @param {String} target
		 * @param {String} param
		 */
		saveTransition: function(target, param) {
			param = param.replace(/ /g, '_');
			this.transitionTo(target, param);
		}
	}
});
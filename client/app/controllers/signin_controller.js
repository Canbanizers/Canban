'use strict';
App.SigninController = Ember.ArrayController.extend({
	actions: {
		/**
		 * Function to find a user.
		 * Returns on success on user object otherwise an error object
		 * @param email
		 * @param password
		 * @return Object
		 */
		loginUser: function(email, password) {
			console.log(this.get('store').find('user', { email: "jan-zaydowicz@web.de" }));
//			var user = this.get('store').find('user', { email: "jan-zaydowicz@web.de" });
//			console.log(user.get('name'));
		}
	}
});

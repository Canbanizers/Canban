'use strict';
App.SignupController = Ember.ObjectController.extend({
	actions: {
		/**
		 * Function to create a user.
		 * Returns on success on user object otherwise an error object
		 * @return Object
		 */
		saveUser: function() {
			var user = this.get('model');
			user.save();
			/**
			 * @TODO isVaild returns also true on 500 error
			 */
			if(user.get('isValid')) {

			}
		}
	}
});

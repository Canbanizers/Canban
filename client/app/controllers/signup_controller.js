'use strict';
App.SignupController = Ember.ObjectController.extend({
	actions: {
		saveUser: function() {
			var user = this.get('model');
			/**
			 * @TODO password will be saved plain into the database, isVaild returns also true on 500 error
			 */
			user.save();
			if(user.get('isValid')) {

			}
		}
	}
});

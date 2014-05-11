'use strict';
App.SignupController = Ember.ObjectController.extend({
	actions: {
		saveUser: function() {
			var user = this.get('model');
			/**
			 * @TODO isVaild returns also true on 500 error
			 */
			user.save();
			if(user.get('isValid')) {

			}
		}
	}
});

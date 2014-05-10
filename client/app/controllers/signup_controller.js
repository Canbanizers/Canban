'use strict';
App.SignupController = Ember.ObjectController.extend({
	actions: {
		saveUser: function(firstname, lastname, email, password) {
			var user = this.get('model');
			user.save();
		}
	}
});

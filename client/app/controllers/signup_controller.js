'use strict';
App.SignupController = Ember.ObjectController.extend({
	actions: {
		saveUser: function() {
			var user = this.get('model');
			user.save();
		}
	}
});

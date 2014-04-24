'use strict';
App.LoginController = Ember.ObjectController.extend({
	loggedInUser: null,
	actions: {
		getUser: function(email, password) {
			var user = this.get('model');
			console.log(user.store);
//			var respones = user.store.find('user', { email: email, password: password });
//			console.log(respones);
		}
	}
});

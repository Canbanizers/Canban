'use strict';
App.LoginController = Ember.ObjectController.extend({
	loggedInUser: null,
	actions: {
		checkLogin: function(email, password) {
			var respone = this.store.find('user', { email: email, password: password })
			this.set('loggedInUser', respone);
		}
	}
});

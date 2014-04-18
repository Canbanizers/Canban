'use strict';
App.LoginController = Ember.ObjectController.extend({
	loggedInUser: null,
	actions: {
		getUser: function(email, password) {
			alert('test');
			var respone = this.store.find('user', { email: email, password: password });
			console.log(respone);
//			this.set('loggedInUser', respone);
		},
		test: function() {
			alert('test controll er');
		}
	}
});

'use strict';
App.SigninController = Ember.ArrayController.extend({
	actions: {
		loginUser: function(email, password) {
			console.log(this.get('store').find('user', { email: "jan-zaydowicz@web.de" }));
//			var user = this.get('store').find('user', { email: "jan-zaydowicz@web.de" });
//			console.log(user.get('name'));
		}
	}
});

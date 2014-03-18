'use strict';
App.LoginCompComponent = Ember.Component.extend({
	isValid: false,
	user: function() {
		return App.User.createRecord();
	},
	actions: {
		login:function() {
			if (this.get('isValid')) {
				console.log(this.get('user'));
			}
		}
	}
})

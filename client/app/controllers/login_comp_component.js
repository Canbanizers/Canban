'use strict';
App.LoginCompComponent = Ember.Component.extend({
	isValid: false,
	user: null,
	actions: {
		login:function() {
			if (this.get('isValid')) {
				console.log(this.get('user.email'));
				loginCehck();
			}
		}
	}
})

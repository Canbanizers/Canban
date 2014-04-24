'use strict';
App.LoginCompComponent = Ember.Component.extend({
	isValid: false,
	user: null,
	submit: 'checkLogin',
	actions: {
		submit: function() {
			if (this.get('isValid')) {
				this.sendAction('submit', this.get('user.email'), this.get('user.password') );
			}
		}
	}
})

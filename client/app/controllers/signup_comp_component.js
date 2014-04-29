'use strict';
App.SignupCompComponent = Ember.Component.extend({
	isValid: false,
	user: null,
	submit: 'checksignup',
	actions: {
		submit: function() {
			if (this.get('isValid')) {
				this.sendAction('submit',
					this.get('user.firstname'),
					this.get('user.lastname'),
					this.get('user.email'),
					this.get('user.password')
				);
			}
		}
	}
})

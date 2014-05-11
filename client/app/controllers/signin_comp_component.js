'use strict';
App.SigninCompComponent = Ember.Component.extend({
	email: '',
	password: '',
	isValid: true,
	actions: {
		submit: function() {
			if (this.get('isValid')) {
				this.sendAction('submit',
					this.get('email'),
					this.get('password')
				);
			}
		}
	}
})

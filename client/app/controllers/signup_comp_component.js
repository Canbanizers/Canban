'use strict';
App.SignupCompComponent = Ember.Component.extend({
	isValid: false,
	user: null,
	submit: 'checksignup',
	actions: {
		submit: function() {
			if (this.get('isValid')) {
				this.sendAction('submit');
			}
		}
	}
})

'use strict';
App.LoginCompComponent = Ember.Component.extend({
	isValid: true,
	user: null,
	actions: {
		login: function() {
			if (this.get('isValid')) {
				this.sendAction('action', this.get('user.email'), this.get('user.password') );
			}
		}
	}
})

'use strict';
App.LoginCompComponent = Ember.Component.extend({
	isValid: false,
	user: null,
	submit: 'checkLogin',
	actions: {
		submit: function() {
			if (this.get('isValid')) {
				alert('testComp');
				this.sendAction('submit', this.get('user.email'), this.get('user.password') );
//				this.sendAction('checkLogin',this.get('user.email'), this.get('user.password') );
			}
		},
		test: function() {
			this.sendAction();
		}
	}
})

'use strict';
App.LoginCompComponent = Ember.Component.extend({
	isValid: false,
	user: null,
	actions: {
		login: function() {
			if (this.get('isValid')) {
				alert('testComp');
				this.sendAction('action', this.get('user.email'), this.get('user.password') );
				this.sendAction('checkLogin',this.get('user.email'), this.get('user.password') );
			}
		}
	}
})

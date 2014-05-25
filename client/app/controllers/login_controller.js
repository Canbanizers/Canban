'use strict';
App.LoginController = Ember.ObjectController.extend({
	needs: ['validation', 'private_canban'],
	/**
	 * set this as the current controller for the validation, the validationcontroller have access to it
	 */
	setController: function() {
		this.get('controllers.validation').initializeController(this);
	},
	validateEmail: function() {
		this.set('emailError', this.get('controllers.validation').getValue('email'));
		this.set('emailError', this.get('controllers.validation').isValidEmail('email'));
	},
	validatePassword: function() {
		this.set('passwordError', this.get('controllers.validation').getValue('password'));
	},
	actions: {
		login: function() {
			var user = this.store.find('user', {email: this.get('email'), password: this.get('password')});
			var self = this;
			console.log(user);
			user.then(function() {
				console.log('abcdsad');
				self.get('controllers.private_canban').user = user;
				self.transitionTo('private_canban');
			}, function() {
				console.log('abc');
			});
		}
	}
});

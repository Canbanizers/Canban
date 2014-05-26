'use strict';
App.LoginController = Ember.ObjectController.extend({
	needs: ['validation', 'private_canban'],
	noChanges: true,

	/**
	 * set this as the current controller for the validation and allows the validationcontroller to have access to it
	 */
	setController: function() {
		this.get('controllers.validation').initializeController(this);
	},
	validateEmail: function() {
		this.set('emailError', this.get('controllers.validation').getValue('email'));
		this.set('invalidEmailError', this.get('controllers.validation').isValidEmail('email'));
		this.set('noChanges', false);
	},
	validatePassword: function() {
		this.set('passwordError', this.get('controllers.validation').getValue('password'));
		this.set('noChanges', false);
	},
	actions: {
		login: function() {
			if(this.get('controllers.validation').hasErrors() || this.noChanges) {
				this.set('saveError', true);
			} else {
				this.set('saveError', false);
				var user = this.store.find('user', {email: this.get('email'), password: this.get('password')});
				var self = this;
				user.then(function() {
					//TODO: Transition don't work yet.
					self.get('controllers.private_canban').user = user;
					self.transitionToRoute('private_canban');
				}, function() {
				});
			}
		}
	}
});

'use strict';
App.LoginController = Ember.ObjectController.extend({
	content: Ember.Object.create({}),
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
		/**
		 * If all login fields are valid, this method sends a server request to check if there is a corresponding  entry
		 * in the database. When there is a user with the specified email and password the model will be injected into
		 * the PrivateCanban Controller.
		 */
		login: function() {
			if(this.get('controllers.validation').hasErrors() || this.noChanges) {
				this.set('saveError', true);
			} else {
				this.set('saveError', false);
				var self = this;
				var userPromise = this.store.find('user', {email: this.get('email'), password: this.get('password')});
				userPromise.then(function(users) {
					users.forEach(function(user){
						self.set('controllers.private_canban.user', user);
						self.get('controllers.private_canban').getData();

					});
				}, function() {
				});
			}
		}
	}
});

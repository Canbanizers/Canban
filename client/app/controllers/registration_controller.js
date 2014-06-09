App.RegistrationController = Ember.ObjectController.extend({
	content: Ember.Object.create({}),
	needs: ['validation'],
	noChanges: true,

	/**
	 * validate functions
	 */
	validateFirstname: function() {
		this.set("firstnameError", this.get('controllers.validation').getValue('firstname'));
	},
	validateLastname: function() {
		this.set('lastnameError', this.get('controllers.validation').getValue('lastname'));
	},
	validateEmail: function() {
		this.set('emailError', this.get('controllers.validation').getValue('email'));
		this.set('emailInvalidError', this.get('controllers.validation').isValidEmail('email'));
	},
	validatePassword: function() {
		this.set('passwordError', this.get('controllers.validation').getValue('password'));
		this.set('noChanges', false);
	},
	validatePasswordConfirmation: function() {
		this.set('passwordConfirmationError', this.get('controllers.validation').getValue('passwordConfirmation'));
		this.set('passwordConfirmationCompareError', this.get('controllers.validation').comparePasswords('passwordConfirmation'));
	},

	/**
	 * set this as the current controller for the validation, the validationcontroller have access to it
	 */
	setController: function() {
		this.get('controllers.validation').initializeController(this);
	},

	/**
	 * actions triggered in template
	 */
	actions: {
		/**
		 * save new user-profile
		 */
		save: function(){

			if(this.get('controllers.validation').hasErrors() || this.get('noChanges')) {
				this.set('wrongInputError', true);
			} else {
				this.set('wrongInputError', false);
				var user = this.get('model');
				var self = this;
				user.save().then(function(){
					self.set('saveError', false);
					self.set('success', true);
					setTimeout(function() {
						self.transitionToRoute('login');
					}, 5000);
				}, function(){
					self.set('saveError', true);
					self.set('success', false);
				});
			}
		},

		/**
		 * cancel and go back to login
		 */
		cancel: function(){
			this.transitionToRoute('login');
		}
	}
});
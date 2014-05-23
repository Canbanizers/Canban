App.UserController = Ember.ObjectController.extend({

	editMode: false,
	deleteMode: false,
	needs: 'validation',

	/**
	 * validate functions
	 * @returns {*}
	 */
	validateFirstname: function() {
		this.set("firstnameError", this.get('controllers.validation').getValue('firstname'));
	},
	validateLastname: function() {
		this.set('lastnameError', this.get('controllers.validation').getValue('lastname'));
	},
	validateEmail: function() {
		this.set('emailError', this.get('controllers.validation').getValue('email'));
//		this.set("emailInvalidError", !this.get('controllers.validation').isValidEmail('email'));
	},
	validatePassword: function() {
		this.set('passwordError', this.get('controllers.validation').getValue('password'));
	},
	validatePasswordConfirmation: function() {
		this.set('passwordConfirmationError', this.get('controllers.validation').getValue('passwordConfirmation'));
		this.set("passwordConfirmationCompareError", this.get('controllers.validation').comparePasswords('passwordConfirmation'));
	},

	/**
	 * actions triggered in template
	 */
	actions: {

	/**
		 * delete user when clicking ok in popup
		 */
		delete: function(){
			this.toggleProperty('deleteMode');
			if(confirm('Really?')){
				this.send('confirmDelete');
				this.transitionToRoute('login');
			} else{
				this.send('cancelDelete');
			}
		},
		cancelDelete: function(){
			this.set('deleteMode', false);
		},

		/**
		 * delete user
		 */
		confirmDelete: function(){
			this.get('model').deleteRecord();
			this.get('model').save();
			this.set('deleteMode', false);
		},

		/**
		 * save new user-profile
		 */
		save: function(){
			var user = this.get('model');
			//TODO: only save without errors
			user.save();
			this.transitionToRoute('user', user.id);
		},

		/**
		 * cancel and go back to personal board
		 */
		cancel: function(){
			//TODO: board-id übergeben
			this.transitionToRoute('board');
		}
	}
});
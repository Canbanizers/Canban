App.UserController = Ember.ObjectController.extend({

	editMode: false,
	deleteMode: false,
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

			if(this.get('controllers.validation').hasErrors() || this.get('noChanges')) {
				this.set('saveError', true);
			} else {
				this.set('saveError', false);
				var user = this.get('model');
				user.set('password', this.get('pwPlaceholder'));
				//TODO: only save without errors
				user.save();
				this.transitionToRoute('user', user.id);
			}
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
App.UserController = Ember.ObjectController.extend({

	editMode: false,
	deleteMode: false,
	needs: 'validation',
	content: Ember.Object.create({}),

	/**
	 * check if mailaddress is valid and trigger the error-message in usertemplate
	 *
	 * @param val
	 * @returns {boolean}
	 */
	isValidEmail: function(val) {
		var error, value;
		value = this.get(val);
		error = false;
		if (!value.match(/^\w+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
			error = true;
			//Debugging
			console.log("" + val + " has error");
		}
		this.set("" + val + "InvalidError", error);
		return error;
	},

	/**
	 *
	 * compare the two password-inputfields and trigger the error-message in usertemplate
	 *
	 * @param val
	 * @returns {boolean}
	 */
	comparePasswords: function(val) {
		var error, value;
		value = this.get(val);
		error = false;
		if(value !== this.get('password')) {
			error = true;
			//Debugging
			console.log("" + val + "Compare has error");
		}
		this.set("" + val + "CompareError", error);
		return error;
	},

	/**
	 *
	 * check if inputfield is empty and trigger the error-message in usertemplate
	 *
	 * @param val
	 * @returns {*}
	 */
	getValue: function(val) {
		var error, result;
		if (!(result = !!this.get(val))) {
			error = true;
			//Debugging
			console.log("" + val + " has error");
		}
		this.set("" + val + "Error", error);
		return result;
	},

	/**
	 * validate functions
	 * @returns {*}
	 */
	validateFirstname: function() {
		return this.getValue('firstname');
	},
	validateLastname: function() {
		return this.getValue('lastname');
	},
	validateEmail: function() {
		return this.getValue('email') && this.isValidEmail('email');
	},
	validatePassword: function() {
		return this.getValue('password');
	},
	validatePasswordConfirmation: function() {
		return this.getValue('passwordConfirmation')  && this.comparePasswords('passwordConfirmation');
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
App.ValidationController = Ember.ObjectController.extend({

	content: Ember.Object.create({}),
	needs: ['user', 'login', 'registration'],
	controller: null,
	isError: {},

	/**
	 * set the current controller which want to use the validation
	 *
	 * @param controller
	 */
	initializeController: function(controller) {
		this.controller = controller;
	},

	/**
	 * check if mailaddress is valid and trigger the error-message in template
	 *
	 * @param val
	 * @returns {boolean}
	 */
	isValidEmail: function(val) {
		var error, value;
		value = this.controller.get(val);
		error = false;
		if (!value.match(/^\w+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
			error = true;
		}

		var errors = this.get('isError');
		errors['email'] = error;
		this.set('isError', errors);
		return error;
	},

	/**
	 *
	 * compare the two password-inputfields and trigger the error-message in template
	 *
	 * @param val
	 * @returns {boolean}
	 */
	comparePasswords: function(val) {
		var error, value;
		value = this.controller.get(val);
		var password = this.controller.get('password');
		error = false;
		if(value !== password ) {
			error = true;
		}

		var errors = this.get('isError');
		errors['comparePassword'] = error;
		this.set('isError', errors);
		return error;
	},

	/**
	 *
	 * check if inputfield is empty and trigger the error-message in template
	 *
	 * @param val
	 * @returns {*}
	 */
	getValue: function(val) {
		var error,result;
		error = false;
		if (!(result = !!this.controller.get(val))) {
			error = true;
		}
		var errors = this.get('isError');
		errors[val] = error;
		this.set('isError', errors);
		return error;
	},


	hasErrors: function() {
		var hasError = false;
		var errors = this.get('isError');
		for(var error in errors) {
			if(errors.hasOwnProperty(error)) {
				if(errors[error]) {
					hasError = true;
				}
			}
		}
		return hasError;
	}
})
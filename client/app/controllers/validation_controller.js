App.ValidationController = Ember.ObjectController.extend({

	content   : Ember.Object.create({}),
	needs     : ['user', 'login', 'registration'],
	controller: null,
	isError   : {},

	/**
	 * set the current controller which want to use the validation
	 *
	 * @param controller
	 */
	initializeController: function(controller) {
		this.controller = controller;
	},

	/**
	 * check if mail address is valid and trigger the error-message in template
	 *
	 * @param val
	 * @returns {Boolean}
	 */
	isValidEmail: function(val) {
		var error, value;
		error = true;
		if (!this.getValue(val)) {
			value = this.controller.get(val);
			error = false;
			if (!value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
				error = true;
			}
		}
		var errors = this.get('isError');
		errors['email'] = error;
		this.set('isError', errors);
		return error;
	},

	/**
	 * compare the two password-input fields and trigger the error-message in template
	 *
	 * @param val
	 * @returns {boolean}
	 */
	comparePasswords: function(val) {
		var error, value;
		error = true;
		if (!this.getValue(val)) {
			value = this.controller.get(val);
			var password = this.controller.get('password');
			var pwPlaceholder = this.controller.get('pwPlaceholder');
			error = false;
			if (value !== password && value !== pwPlaceholder) {
				error = true;
			}
		}
		var errors = this.get('isError');
		errors['comparePassword'] = error;
		this.set('isError', errors);
		return error;
	},

	/**
	 * check if input field is empty and trigger the error-message in template
	 *
	 * @param val
	 * @returns {boolean}
	 */
	getValue: function(val) {
		var error;
		error = false;
		if (!this.controller.get(val)) {
			error = true;
		}
		var errors = this.get('isError');
		errors[val] = error;
		this.set('isError', errors);
		return error;
	},

	/**
	 * iterates through the isError-array and returns true if any of them are true
	 * @returns {boolean}
	 */
	hasErrors: function() {
		var hasError = false;
		var errors = this.get('isError');
		for (var error in errors) {
			if (errors.hasOwnProperty(error)) {
				if (errors[error]) {
					hasError = true;
				}
			}
		}
		return hasError;
	}
});
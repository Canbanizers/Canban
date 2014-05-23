App.ValidationController = Ember.ObjectController.extend({

	content: Ember.Object.create({}),
	needs: ['user'],
	controller: null,

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
			//Debugging
			console.log("" + val + " has error");
		}
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
		error = false;
		if(value !== this.controller.get('password')) {
			error = true;
			//Debugging
			console.log("" + val + "Compare has error");
		}
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
		var error, result;
		error = false;
		if (!(result = !!this.controller.get(val))) {
			error = true;
			//Debugging
			console.log("" + val + " has error");
		}
		return error;
	}
})
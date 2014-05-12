'use strict';
App.SigninCompComponent = Ember.Component.extend({
	/**
	 * email variable
	 * @var string
	 */
	email: '',
	/**
	 * password variable
	 * @var string
	 */
	password: '',
	/**
	 * check if all input fields are full correctly
	 * @var boolean
	 */
	isValid: true,
	actions: {
		submit: function() {
			if (this.get('isValid')) {
				this.sendAction('submit',
					this.get('email'),
					this.get('password')
				);
			}
		}
	}
})

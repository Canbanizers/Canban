'use strict';
App.SignupCompComponent = Ember.Component.extend({
	/**
	 * check if all input fields are full correctly
	 * @var boolean
	 */
	isValid: false,
	actions: {
		submit: function() {
			if (this.get('isValid')) {
				this.sendAction('submit');
			}
		}
	}
})

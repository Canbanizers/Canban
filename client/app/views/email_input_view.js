'use strict';
App.EmailInputView = Ember.TextField.extend({
	classNames: ['board-input-field'],
	classNameBindings: ['isValidEmail:valid:invalid'],
	isValidEmail: false,
	change: function() {
		var value = this.get('value');
		if(value) {
			if(value.match(/^[\w-\._\+%]+@(?:[\w-]+\.)+[\w]{2,6}$/)) {
				this.set('isValidEmail', true);
				this.set('parentView.isValid', true);
			} else {
				this.set('isValidEmail', false);
				this.set('parentView.isValid', false);
			}
		}
	}
});
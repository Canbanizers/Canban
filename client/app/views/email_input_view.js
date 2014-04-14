'use strict';
App.EmailInputView = Ember.View.extend({
	tagName: 'input',
	contentBinding: 'App.LoginCompComponent',
	eventManager: Ember.Object.create({
		focusOut: function(event, view) {
			if (view.$().val().match(/^[\w-\._\+%]+@(?:[\w-]+\.)+[\w]{2,6}$/)) {
				view.set('controller.isValid', true);
				return view.$().val();
			}
			view.set('controller.isValid', false);
			return view.$().val();
		}
	})
});

Ember.Handlebars.helper('email-input', App.EmailInputView);
/**
 * Created by Jan-work on 27.02.14.
 */


App.EmailInputView = Ember.View.extend({
	tagName: 'input',
	eventManager: Ember.Object.create({
		focusOut: function(event, view) {
			if (view.$().val().match(/^[\w-\._\+%]+@(?:[\w-]+\.)+[\w]{2,6}$/)) {
				return view.set('controller.isValid', true)
			}
			return view.set('controller.isValid', false)
		}
	})
});

Ember.Handlebars.helper('email-input', App.EmailInputView);

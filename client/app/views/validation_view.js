/**
 * connect view with usertemplate
 * @type {*|void|Object|extend|extend|extend}
 */
App.ValidationView = Ember.View.extend({
//	templateName: 'user'
});

/**
 * get the controller and camelcase the controllers validatorfunction
 * then trigger the controllers validatorfunction
 *
 * @type {*|void|Object|extend|extend|extend}
 */
App.ValidationTextField = Ember.TextField.extend({
	focusOut: function() {
		var controller, validatorName, viewName;
		controller = this.get('parentView.controller');
		controller.setController();
		viewName = this.get('viewName');
		validatorName = "" + (Em.String.classify(viewName));
		return controller["validate" + validatorName]();
	}
});

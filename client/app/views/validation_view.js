App.ValidationView = Ember.View.extend({
	templateName: 'user'
});

App.ValidationTextField = Ember.TextField.extend({
	focusOut: function() {
		var controller, validatorName, viewName;
		controller = this.get('parentView.controller');
		viewName = this.get('viewName');
		validatorName = "" + (Em.String.classify(viewName));
		return controller["validate" + validatorName]();
	}
});

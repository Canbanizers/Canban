App.LoginRoute = Ember.Route.extend({
	renderTemplate:function() {
		this._super();
		localStorage.clear();
	}
});
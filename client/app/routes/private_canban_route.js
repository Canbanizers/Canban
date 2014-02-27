App.PrivateCanbanRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('ticket');
	},
	renderTemplate: function () {
		this.render('board');
	}
});
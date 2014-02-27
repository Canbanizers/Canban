App.PrivateCanbanRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('ticket');
	},
	renderTemplate: function () {
		this.render('board');
	},
	setupController: function(controller, model) {
		this.controllerFor('board').set('model', model);
	}
});
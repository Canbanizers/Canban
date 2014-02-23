App.PrivateCanbanRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('ticket');
	}
});
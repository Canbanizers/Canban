App.BoardShowRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('board');
	}
});
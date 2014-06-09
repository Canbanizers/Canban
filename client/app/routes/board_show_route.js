App.BoardShowRoute = Ember.Route.extend({

	/**
	 * loads the model used by the BoardRoute
	 *
	 * @returns {*|Object}
	 */
	model: function() {
		return this.modelFor('board');
	}
});
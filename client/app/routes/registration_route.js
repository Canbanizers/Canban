App.RegistrationRoute = Ember.Route.extend({

	/**
	 * creates a new temporary user to be edited on registration and save on submit or rollback on cancel
	 *
	 * @returns {DS.Model|*}
	 */
	model: function() {
		return this.store.createRecord('user');
	}
});
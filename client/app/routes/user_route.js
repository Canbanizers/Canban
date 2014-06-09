'use strict';
App.UserRoute = Ember.Route.extend({

	/**
	 *
	 * @returns {DS.Model|*|Object} currently logeding user
	 */
	model: function() {
		return this.controllerFor('private_canban').get('user');
	}
});
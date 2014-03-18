'use strict';
App.PrivateCanbanLoginRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('user');
	}
});

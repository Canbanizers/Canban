'use strict';
App.SignupRoute = Ember.Route.extend({
	model: function() {
		return this.store.createRecord('User');
	}
});

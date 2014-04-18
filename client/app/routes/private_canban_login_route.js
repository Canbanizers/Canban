'use strict';
App.LoginRoute = Ember.Route.extend({
	model: function() {
		return this.store.createRecord('User');
//		return this.store.find('User', 1);
	}
});

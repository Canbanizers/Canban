/**
 * Created by Jan-work on 27.02.14.
 */

App.PrivateCanbanLoginRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('user');
	}
});

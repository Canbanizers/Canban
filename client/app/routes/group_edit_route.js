App.GroupEditRoute = Ember.Route.extend({
	model: function(){
		return this.modelFor('group');
	}
});
App.GroupRoute = Ember.Route.extend({
	model: function(params){
		return this.store.find('group', params.user_id);
	}
});
App.GroupCreateRoute = Ember.Route.extend({
	model: function(){
		//new empty model for this route
		return Em.Object.create({});
	},

	renderTemplate: function(){
		this.render('group.edit', {
			controller: 'groupCreate'
		})
	}
});
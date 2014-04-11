App.GroupEditController = Ember.ObjectController.extend({
	actions: {
		save: function() {
			var group = this.get('model');
			group.save();
			this.transitionToRoute('group', group);
		}
	}
})
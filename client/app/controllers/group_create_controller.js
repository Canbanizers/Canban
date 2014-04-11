App.GroupCreateController = Ember.ObjectController.extend({
	actions: {
		save: function() {
			this.get('model').set('creationDate', new Date());
			var newGroup = this.store.createRecord('group', this.get('model'));
			newGroup.save();
			this.transitionToRoute('group', newGroup);
		}
	}
})
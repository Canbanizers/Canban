App.GroupsController = Ember.ArrayController.extend({
	sortProperties: ['name'],
	sortAscending: true,

	groupsCount: function() {
		return this.get('model.length');
	}.property('@each')
});
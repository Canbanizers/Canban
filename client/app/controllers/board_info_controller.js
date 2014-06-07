App.BoardInfoController = Ember.ObjectController.extend({
	needs   : ['boards'],
	info    : true,

	hasChildren: function() {
		return this.get('children.length') > 0;
	}.property('children.length')
});
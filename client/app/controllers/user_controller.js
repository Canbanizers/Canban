App.UserController = Ember.ObjectController.extend({
	editMode: false,

	deleteMode: false,

	actions: {
		delete: function(){
			this.toggleProperty('deleteMode');
		},
		cancelDelete: function(){
			this.set('deleteMode', false);
		},
		confirmDelete: function(){
			this.get('model').deleteRecord();
			this.get('model').save();
			this.set('deleteMode', false);
		},
		save: function(){
			var user = this.get('model');
			user.save();
			this.transitionToRoute('user', user);
		},
		cancel: function(){
			//board-id?
			this.transitionToRoute('board');
		}

	}
});
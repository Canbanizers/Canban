App.UserController = Ember.ObjectController.extend(Ember.Evented, {
	editMode: false,

	deleteMode: false,

	passwordConfirmation: '',

	actions: {
		delete: function(){
			this.toggleProperty('deleteMode');
			if(confirm('Really?')){
				this.send('confirmDelete');
				this.transitionToRoute('login');
			} else{
				this.send('cancelDelete');
			}
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
			this.send('passwordCompare');
			var user = this.get('model');
			if(!this.get("confirmationFailed") ){
				user.save();
			}
			this.transitionToRoute('user', user.id);
		},
		cancel: function(){
			//TODO: board-id übergeben
			this.transitionToRoute('board');
		},
		passwordCompare: function(){
			if(this.get('password') != this.get('passwordConfirmation')){
				this.set("confirmationFailed", true);
			}
		}
	}
});
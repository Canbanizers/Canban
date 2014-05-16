App.UserController = Ember.ObjectController.extend(Ember.Evented, {

	editMode: false,
	deleteMode: false,
	content: Ember.Object.create(),

	isValidEmail: function(val) {
		var error, value;
		value = this.get(val);
		error = false;
		if(!value.match(/^[\w-\._\+%]+@(?:[\w-]+\.)+[\w]{2,6}$/)) {
			error = true;
			//Debugging
			console.log("" + val + " has error");
		}
		this.set("" + val + "InvalidError", error);
		return error;
	},
	comparePasswords: function(val) {
		var error, value;
		value = this.get(val);
		error = false;
		if(value !== this.get('password')) {
			error = true;
			//Debugging
			console.log("" + val + "Compare has error");
		}
		this.set("" + val + "CompareError", error);
		return error;
	},
	getValue: function(val) {
		var error, result;
		if (!(result = !!this.get(val))) {
			error = true;
			//Debugging
			console.log("" + val + " has error");
		}
		this.set("" + val + "Error", error);
		return result;
	},
	validateFirstName: function() {
		return this.getValue('firstName');
	},
	validateLastName: function() {
		return this.getValue('lastName');
	},
	validateEmail: function() {
		return this.getValue('email') && this.isValidEmail('email');
	},
	validatePassword: function() {
		return this.getValue('password');
	},
	validatePasswordConfirmation: function() {
		return this.getValue('passwordConfirmation')  && this.comparePasswords('passwordConfirmation');
	},

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
			var user = this.get('model');
			//TODO: only save without errors
			user.save();
			this.transitionToRoute('user', user.id);
		},
		cancel: function(){
			//TODO: board-id übergeben
			this.transitionToRoute('board');
		}
	}
});
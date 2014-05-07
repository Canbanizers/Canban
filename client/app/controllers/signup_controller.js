'use strict';
App.SignupController = Ember.ObjectController.extend({
	actions: {
		saveUser: function(firstname, lastname, email, password) {
			var user = this.get('model');
			user.save().then(function(response){
				console.log( response );
				console.log( response.get('isValid') );
			},function(xhr) {
				console.log( errors = xhr.responseJSON.errors );
			});
		}
	}
});

/**
 * Created by Jan-work on 27.02.14.
 */

App.LoginController = Ember.ObjectController.extend({
	isValid: false,
	action: {
		login:function() {
			console.log(isValid);
			if(isValid) {
				userCrenditials = this.getProperties('email', 'password');
				$.post('/auth.json', userCrenditials).then(function(response) {
					console.log(response);
				})
			}
		}
	}
})

/**
 * Created by Jan-work on 23.01.14.
 */

Todos.LoginController = Ember.Controller.extend({

	reset: function() {
		this.setProperties({
			username: "",
			password: "",
			errorMessage: ""
		});
	},

	token: localStorage.token,
	tokenChanged: function() {
		localStorage.token = this.get('token');
	}.observes('token'),

	login: function() {

		var self = this, data = this.getProperties('username', 'password');

		// Clear out any error messages.
		this.set('errorMessage', null);

		var credentials = JSON.stringify(data)

		var parameters = {'controller': 'modelController', 'table': 'User', 'action': 'Login', 'credentials': credentials};

		var request = $.ajax(({ url: '/Canban/backend/php/factory/RequestHandler.php',
			data: parameters,
			type: 'post'
		}));

		request.done();

		$.post('', data).then(function(response) {

			self.set('errorMessage', response.message);
			if (response.success) {
				alert('Login succeeded!');
				self.set('token', response.token);
			}
		});
	}
});

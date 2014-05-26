App.UserLoginAdapter = App.ApplicationAdapter.extend({

	ajaxError: function(jqXHR) {

	},

	findQuery: function(store, type, query) {
		return this.ajax(this.buildURL('login'), 'GET', { data: query }).then(function(users) {
			return users;
			})
	}
});

App.UserLoginSerializer = DS.RESTSerializer.extend({
	keyForAttribute: function(attr) {
		return Ember.String.underscore(attr).toUpperCase();
	}
});
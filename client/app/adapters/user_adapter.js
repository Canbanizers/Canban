App.UserAdapter = App.ApplicationAdapter.extend({

	ajaxError: function(jqXHR) {

	},

	findQuery: function(store, type, query) {
		return this.ajax(this.buildURL('login'), 'GET', { data: query }).then(function(users) {
			var returnVal =[Ember.copy(users)];
//			returnVal[users.id] = Ember.copy(users);
			console.log(returnVal);
			return returnVal;
		});
	}
});
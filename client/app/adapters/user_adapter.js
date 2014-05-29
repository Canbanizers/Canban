/**
 * Adapter used for validating the user credentials with the server
 * @type {*|void|Object}
 */
App.UserAdapter = App.ApplicationAdapter.extend({
	/**
	 *
	 * @param {DS.store} store
	 * @param type
	 * @param query
	 * @returns {Promise|*}
	 */
	findQuery: function(store, type, query) {
		return this.ajax(this.buildURL('login'), 'GET', { data: query }).then(function(users) {
			return users;
			})
	}
});

/**
 * The UserAdapter needs to use the DS.RESTSerializer instead of the normally used DS.JSONSerializer
 * @type {*|void|Object}
 */
App.UserSerializer = DS.RESTSerializer.extend({});
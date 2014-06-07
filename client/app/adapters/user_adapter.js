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
		var promise = this.ajax(this.buildURL('login'), 'GET', { data: query });
		var self = this;
		promise.then(function(response) {
			console.log(response);
			var namespace = self._namespaceForType(type);
			self._addRecordToNamespace(namespace, response['users'][0], true);
			self._saveData();
		});
		return promise;
	}
})

/**
 * The UserAdapter needs to use the DS.RESTSerializer instead of the normally used DS.JSONSerializer
 * @type {*|void|Object}
 */
App.UserSerializer = DS.RESTSerializer.extend({});
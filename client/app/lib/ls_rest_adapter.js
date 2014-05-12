/*global Ember*/
/*global DS*/

DS.LSRESTAdapter = DS.RESTAdapter.extend(Ember.Evented, {

	init: function() {
		this._loadData();
	},

	generateIdForRecord: function() {
		return Math.random().toString(32).slice(2).substr(0, 5);
	},

	find: function(store, type, id) {
		var namespace = this._namespaceForType(type);
		return Ember.RSVP.resolve(Ember.copy(namespace.records[id]));
	},

	findMany : function(store, type, ids) {
		var namespace = this._namespaceForType(type);
		var results = [];
		for (var i = 0; i < ids.length; i++) {
			results.push(Ember.copy(namespace.records[ids[i]]));
		}
		return Ember.RSVP.resolve(results);
	},

	/**
	 * Supports queries that look like this:
	 *
	 * {
	 * <property to query>: <value or regex (for strings) to match>,
	 * ...
	 * }
	 *
	 * Every property added to the query is an "AND" query, not "OR"
	 *
	 * Example:
	 *
	 * match records with "complete: true" and the name "foo" or "bar"
	 *
	 * { complete: true, name: /foo|bar/ }
	 */
	findQuery: function(store, type, query) {
		var namespace = this._namespaceForType(type);
		var results = this.query(namespace.records, query);
		return Ember.RSVP.resolve(results);
	},

	query: function(records, query) {
		var results = [];
		var id, record, property, test, push;
		for (id in records) {
			record = records[id];
			for (property in query) {
				test = query[property];
				push = false;
				if (Object.prototype.toString.call(test) === '[object RegExp]') {
					push = test.test(record[property]);
				} else {
					push = record[property] === test;
				}
			}
			if (push) {
				results.push(record);
			}
		}
		return results;
	},

	findAll: function(store, type, sinceToken) {
		var self = this;
		var namespace = self._namespaceForType(type);
		var results = [];
		var serverResponse = self._super(store, type, self._getLastUpdated(type));
		self._setLastUpdated(type, moment().format('YYYY-MM-DD HH:mm:ss'));
		return Ember.RSVP.resolve(serverResponse.then(function(object) {
			for (var array in object) {
				if (object.hasOwnProperty(array)) {
					object[array].forEach(function(record) {
						var id = record.id;
						self._addRecordToNamespace(namespace, record, true);
					});
					self._saveData();
				}
			}
			for (var id in namespace.records) {
				results.push(Ember.copy(namespace.records[id]));
			}
			return Ember.RSVP.resolve(results);
		}));
	},

	createRecord: function(store, type, record) {
		var self = this;
		var serverResponse = this._super(store, type, record);
		return Ember.RSVP.resolve(serverResponse.then(function(object) {
			for (var property in object) {
				if (object.hasOwnProperty(property)) {
					record.set('id', object[property].id);
					record.set('creation_date', object[property].creation_date);
				}
			}

			var namespace = self._namespaceForType(type);
			var id = record.get('id');
			self._addRecordToNamespace(namespace, record);
			self._saveData();
			return Ember.RSVP.resolve();
		}));
	},

	updateRecord: function(store, type, record) {
		this._super(store, type, record);
		var namespace = this._namespaceForType(type);
		var id = record.get('id');
		namespace.records[id] = record.toJSON({ includeId: true });
		this._saveData();
		return Ember.RSVP.resolve();
	},

	deleteRecord: function(store, type, record) {
		this._super(store, type, record);
		var namespace = this._namespaceForType(type);
		var id = record.get('id');
		delete namespace.records[id];
		this._saveData();
		return Ember.RSVP.resolve();
	},

	// private

	_getNamespace: function() {
		return this.lsnamespace || 'DS.LSAdapter';
	},

	_loadData: function() {
		var storage = localStorage.getItem(this._getNamespace());
		this._data = storage ? JSON.parse(storage) : {};
	},

	_saveData: function() {
		localStorage.setItem(this._getNamespace(), JSON.stringify(this._data));
	},

	_getLastUpdated: function(type) {
		var lastUpdated = localStorage.getItem('lastUpdated.' + type);
		return lastUpdated;
	},

	_setLastUpdated: function(type, timestamp) {
		localStorage.setItem('lastUpdated.' + type, timestamp);
	},

	_namespaceForType: function(type) {
		var namespace = type.url || type.toString();
		return this._data[namespace] || (
			this._data[namespace] = {records: {}}
			);
	},

	_addRecordToNamespace: function(namespace, record, serialized) {
		var data = null;
		if (!serialized) {
			data = record.serialize({includeId: true});
		} else {
			data = record;
		}
		namespace.records[data.id] = data;
	}
});
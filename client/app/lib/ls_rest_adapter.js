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
		return serverResponse.then(function(object) {
			self._setLastUpdated(type);

			for (var array in object) {

				if (object.hasOwnProperty(array)) {

					object[array].forEach(function(record) {

						self._addRecordToNamespace(namespace, record, true);

					});
					self._saveData();
				}
			}

			for (var id in namespace.records) {
				results.push(Ember.copy(namespace.records[id]));
			}

			return Ember.RSVP.resolve(results);
		});
	},

	createRecord: function(store, type, record) {
		var self = this;
		var serverResponse = this._super(store, type, record);
		return serverResponse.then(function(object) {
			for (var property in object) {
				if (object.hasOwnProperty(property)) {
					record.set('id', object[property].id);
					record.set('creation_date', object[property].creation_date);
				}
			}
			return self._updateLocalStorage(record, type, false);
		})
	},

	updateRecord: function(store, type, record) {
		this._super(store, type, record);
		return this._updateLocalStorage(record, type, false);
	},

	deleteRecord: function(store, type, record) {
		this._super(store, type, record);
		return this._updateLocalStorage(record, type, true);
	},

	// private
	_updateLocalStorage: function(record, type, deleteRcd) {
		var namespace = this._namespaceForType(type);
		var id = record.get('id');
		if (!deleteRcd) {
			this._addRecordToNamespace(namespace, record);
		} else {
			delete namespace.records[id];
		}
		this._saveData();
		return Ember.RSVP.resolve();

	},

	_getLastUpdated: function(type) {
		var lastUpdated = localStorage.getItem('lastUpdated.' + type);
		return lastUpdated;
	},

	_setLastUpdated: function(type) {
		localStorage.setItem('lastUpdated.' + type, moment().format(window.timestampFormat));
	},

	_getNamespace: function() {
		return this.lsnamespace || 'DS.LSAdapter';
	},

	_loadData: function() {
		var storage = localStorage.getItem(this._getNamespace());
		this._data = storage ? JSON.parse(storage) : {};
	},

	_saveData: function() {
		var jsonData = JSON.stringify(this._data, this._jsonStringifyHasMany);
		localStorage.setItem(this._getNamespace(), jsonData);
	},

	_jsonStringifyHasMany: function(undef, array) {
		if (Object.prototype.toString.call(array) === '[object Array]') {
			var tempArray = [];
			array.forEach(function(item) {
				if (item.id) {
					tempArray.push(item.id);
				} else {
					tempArray.push(item);

				}
			});
			return tempArray;
		} else {
			return array;
		}
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
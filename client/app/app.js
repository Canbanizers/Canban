'use strict';
window.App = Ember.Application.create({});

App.Router.map(function() {
	this.resource('private_canban', { path: '/' }, function() {
		this.resource('board', {path: '/board/:board_id'}, function(){});
		this.resource('signup', {path: '/signup'} , function() {
		});
	});
});

App.ApplicationAdapter = DS.LSRESTAdapter.extend({
	host       : 'http://localhost/canban',
	namespace  : 'api',
	lsnamespace: 'private_canban',
	/**
	 * Catches Ajax errors from the server
	 * @param jqXHR
	 * @returns {Object}
	 */
	ajaxError: function(jqXHR) {
		var error = this._super(jqXHR);

		if (error && error.status === 500) {
			/**
			 * Get the JSON object and throw an error
			 * @TODO Der Error wird nicht gefangen und dadurch wird das Script abgebrochen
			 * @type {InvalidError}
			 */
			return new DS.InvalidError(error.responseJSON);
		} else {
			return error;
		}
	}
});

App.ApplicationSerializer = DS.JSONSerializer.extend({});

DS.JSONSerializer.reopen({
	/**
	 * Have to do this to enable arrays of ids to be written in parent models
	 * with 'hasMany" relationships
	 */
	serializeHasMany: function(record, json, relationship) {
		var key = relationship.key;

		var relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);

		if (relationshipType === 'manyToNone' || relationshipType === 'manyToMany' ||
			relationshipType === 'manyToOne') {
			json[key] = Ember.get(record, key).mapBy('id');
		}
	},

	/**
	 * Copied from DS.RESTAdapter. This is needed for our own LSRESTAdapter implementation
	 *
	 You can use this method to customize the root keys serialized into the JSON.
	 By default the REST Serializer sends camelized root keys.
	 For example, your server may expect underscored root objects.

	 ```js
	 App.ApplicationSerializer = DS.RESTSerializer.extend({
          serializeIntoHash: function(data, type, record, options) {
            var root = Ember.String.decamelize(type.typeKey);
            data[root] = this.serialize(record, options);
          }
        });
	 ```

	 @method serializeIntoHash
	 @param {Object} hash
	 @param {subclass of DS.Model} type
	 @param {DS.Model} record
	 @param {Object} options
	 */
	serializeIntoHash: function(hash, type, record, options) {
		var root = Ember.String.camelize(type.typeKey);
		hash[root] = this.serialize(record, options);
	}

});


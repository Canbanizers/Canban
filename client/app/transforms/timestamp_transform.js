window.timestampFormat = 'YYYY-MM-DD HH:mm:ss';

/**
 * Used to serialize/deserialize timestamps obtained from the server
 *
 * @type {*|void|Object}
 */
App.TimestampTransform = DS.Transform.extend({
	deserialize: function(serialized) {
		if (serialized) {
			return moment(serialized, window.timestampFormat);
		}
		return serialized;
	},

	serialize: function(deserialized) {
		if (deserialized) {
			var ts = moment(deserialized, window.timestampFormat);
			return ts.format(window.timestampFormat);
		}
		return deserialized;
	}
});
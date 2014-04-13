App.TimestampTransform = DS.Transform.extend({
	deserialize: function(serialized) {
		if (serialized) {
			return moment(serialized, 'YYYY-MM-DD HH:mm:ss').toDate();
		}
		return serialized;
	},

	serialize: function(deserialized) {
		if (deserialized) {
			return moment(deserialized, 'YYYY-MM-DD HH:mm:ss');
		}
		return deserialized;
	}
});
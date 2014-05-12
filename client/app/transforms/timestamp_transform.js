var format = 'YYYY-MM-DDTHH:mm:ss+0200';

App.TimestampTransform = DS.Transform.extend({
	deserialize: function(serialized) {
		if (serialized) {
			return moment(serialized, format).toDate();
		}
		return serialized;
	},

	serialize: function(deserialized) {
		if (deserialized) {
			var ts = moment(deserialized, format);
			return ts.format(format);
		}
		return deserialized;
	}
});
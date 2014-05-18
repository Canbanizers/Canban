<<<<<<< HEAD
window.timestampFormat = 'YYYY-MM-DD HH:mm:ss';

App.TimestampTransform = DS.Transform.extend({
	deserialize: function(serialized) {
		if (serialized) {
			return moment(serialized, window.timestampFormat);
=======
App.TimestampTransform = DS.Transform.extend({
	deserialize: function(serialized) {
		if (serialized) {
			return moment(serialized, 'YYYY-MM-DD HH:mm:ss').toDate();
>>>>>>> implement_ticket_handling
		}
		return serialized;
	},

	serialize: function(deserialized) {
		if (deserialized) {
<<<<<<< HEAD
			var ts = moment(deserialized, window.timestampFormat);
			return ts.format(window.timestampFormat);
=======
			return moment(deserialized, 'YYYY-MM-DD HH:mm:ss');
>>>>>>> implement_ticket_handling
		}
		return deserialized;
	}
});
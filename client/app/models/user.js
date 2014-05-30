App.User = DS.Model.extend({
	firstname: DS.attr('string'),
	lastname: DS.attr('string'),
	password: DS.attr('string'),
	email: DS.attr('string'),
	lastLogin : DS.attr('timestamp'),
	token: DS.attr('string')
});
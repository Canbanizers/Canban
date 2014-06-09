App.Group = DS.Model.extend({
	//a group can have many users
	members     : DS.hasMany('user', { async: true }),
	name        : DS.attr('string'),
	password    : DS.attr('password'),
	creationDate: DS.attr('date')
	//....have to be completed
});
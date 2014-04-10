App.Group = DS.Model.extend({
	//a group can have many users
	members: DS.hasMany('user', { async: true }),
	name : DS.attr('string'),
	password: DS.attr('password'),
	creationDate: DS.attr('creationDate')
	//....have to be completed
});



App.Group.FIXTURES = [
	{
		id: 1,
		members: [1, 2],
		name: "Cartman and Kennys Board",
		password: "123",
		creationDate: "Do, 10 Apr 2014 10:10:10 GMT"
	},
	{
		id: 2,
		members: [1],
		name: "Other Board",
		password: "456",
		creationDate: "Do, 10 Apr 2014 11:11:11 GMT"
	}
];
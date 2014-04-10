App.User = DS.Model.extend({
	//a user can have many groups
	group: DS.hasMany('group', { async: true }),
	name : DS.attr('string'),
	password: DS.attr('number'),
	email: DS.attr('email')
	//....have to be completed
});



App.User.FIXTURES = [
	{
		id: 1,
		group: [1, 2],
		name: "Eric Cartman",
		password: "fatass",
		email: "cartman@southpark.com"
	},
	{
		id: 2,
		group: [1],
		name: "Kenny McCormick",
		password: "they_killed_kenny",
		email: "kenny@southpark.com"
	}
];
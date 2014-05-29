App.User = DS.Model.extend({
	//a user can have many groups
	group: DS.hasMany('group', { async: true }),
	firstname: DS.attr('string'),
	lastname: DS.attr('string'),
	password: DS.attr('string'),
	email: DS.attr('string'),
	lastLogin : DS.attr('timestamp'),
	token: DS.attr('string'),

	fullname: function(){
		return this.get('firstname')+' '+this.get('lastname');
	}.property('firstname', 'lastname')

	//....have to be completed
});


//TODO Fixtures remove fixture data before final commit
App.User.FIXTURES = [
	{
		id: 1,
		group: [1, 2],
		firstname: "Eric",
		lastname: "Cartman",
		email: "cartman@southpark.com",
		password: "fatass",
		lastChanged: "Do, 10 Apr 2014 10:10:10 GMT"
	},
	{
		id: 2,
		group: [1],
		firstname: "Kenny",
		lastname: "McCormick",
		email: "kenny@southpark.com",
		password: "they_killed_kenny",
		lastChanged: "Do, 10 Apr 2014 11:11:11 GMT"
	}
];
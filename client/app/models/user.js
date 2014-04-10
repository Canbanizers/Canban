<<<<<<< HEAD
'use strict';
App.User = DS.Model.extend({
	email : DS.attr('string'),
	firstname : DS.attr('string'),
	lastname : DS.attr('string'),
	lastlogin : DS.attr('string'),
	password : DS.attr('string'),
	authtoken : DS.attr('string')
});

App.User.FIXTURES = [
	{
		id : 1,
		email : 'john@smith.de',
		firstname : 'John',
		lastname : 'Smith',
		lastlogin : 'Learn Ember.js',
		password : '0815',
		authtoken : 'AbCdE'
	},
	{
		id : 2,
		email : 'james@macin.de',
		firstname : 'James',
		lastname : 'Macin',
		lastlogin : 'Learn Ember.js',
		password : 'abc',
		authtoken : 'ABCDE'
	},
	{
		id : 3,
		email: 'donald@trump.de',
		firstname : 'Donald',
		lastname : 'Trump',
		lastlogin : 'Learn Ember.js',
		password : '1234',
		authtoken : 'abcde'
	}
];
=======
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
>>>>>>> add basic group- and usermodel #76

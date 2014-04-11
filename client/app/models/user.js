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
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	userName: DS.attr('string'),
	password: DS.attr('number'),
	email: DS.attr('string'),
	lastChanged: DS.attr('date'),

	fullName: function(){
		return this.get('firstName')+' '+this.get('lastName');
	}.property('firstName', 'lastName')

	//....have to be completed
});



App.User.FIXTURES = [
	{
		id: 1,
		group: [1, 2],
		firstName: "Eric",
		lastName: "Cartman",
		userName: "Coone",
		email: "cartman@southpark.com",
		password: "fatass",
		lastChanged: "Do, 10 Apr 2014 10:10:10 GMT"
	},
	{
		id: 2,
		group: [1],
		firstName: "Kenny",
		lastName: "McCormick",
		userName: "Mysterion",
		email: "kenny@southpark.com",
		password: "they_killed_kenny",
		lastChanged: "Do, 10 Apr 2014 11:11:11 GMT"
	}
];
>>>>>>> add basic group- and usermodel #76

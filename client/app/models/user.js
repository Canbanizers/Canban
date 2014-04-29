'use strict';
App.User = DS.Model.extend({
	email : DS.attr('string'),
	firstName : DS.attr('string'),
	lastName : DS.attr('string'),
	lastLogin : DS.attr('timestamp'),
	password : DS.attr('string'),
	authtoken : DS.attr('string')
});

App.User.FIXTURES = [
	{
		id : 1,
		email : ' ',
		firstName : 'John',
		lastName : 'Smith',
		lastLogin : 'Learn Ember.js',
		password : '0815',
		authtoken : 'AbCdE'
	},
	{
		id : 2,
		email : 'james@macin.de',
		firstName : 'James',
		lastName : 'Macin',
		lastLogin : 'Learn Ember.js',
		password : 'abc',
		authtoken : 'ABCDE'
	},
	{
		id : 3,
		email: 'donald@trump.de',
		firstName : 'Donald',
		lastName : 'Trump',
		lastLogin : 'Learn Ember.js',
		password : '1234',
		authtoken : 'abcde'
	}
];

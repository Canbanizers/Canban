'use strict';
App.User = DS.Model.extend({
	email : DS.attr('string'),
	firstname : DS.attr('string'),
	lastname : DS.attr('string'),
	lastLogin : DS.attr('timestamp'),
	password : DS.attr('string')
});

App.User.FIXTURES = [
	{
		id : 1,
		email : ' ',
		firstname : 'John',
		lastname : 'Smith',
		lastLogin : 'Learn Ember.js',
		password : '0815'
	},
	{
		id : 2,
		email : 'james@macin.de',
		firstname : 'James',
		lastname : 'Macin',
		lastLogin : 'Learn Ember.js',
		password : 'abc'
	},
	{
		id : 3,
		email: 'donald@trump.de',
		firstname : 'Donald',
		lastname : 'Trump',
		lastLogin : 'Learn Ember.js',
		password : '1234'
	}
];

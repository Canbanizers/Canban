<<<<<<< HEAD
'use strict';
=======
/**
 * Created by Jan-work on 27.02.14.
 */

>>>>>>> Login
App.User = DS.Model.extend({
	email : DS.attr('string'),
	firstname : DS.attr('string'),
	lastname : DS.attr('string'),
<<<<<<< HEAD
	lastlogin : DS.attr('string'),
	password : DS.attr('string'),
	authtoken : DS.attr('string')
=======
	lastlogin: DS.attr('string'),
	authtoken: DS.attr('string')
>>>>>>> Login
});

App.User.FIXTURES = [
	{
<<<<<<< HEAD
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
=======
		id    : 1,
		firstname : 'John',
		lastname : 'Smith',
		lastlogin : 'Learn Ember.js',
		authtoken : 'AbCdE'
	},
	{
		id    : 2,
		firstname : 'James',
		lastname : 'Macin',
		lastlogin : 'Learn Ember.js',
		authtoken : 'ABCDE'
	},
	{
		id    : 3,
		firstname : 'Donald',
		lastname : 'Trump',
		lastlogin : 'Learn Ember.js',
>>>>>>> Login
		authtoken : 'abcde'
	}
];

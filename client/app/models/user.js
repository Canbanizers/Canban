/**
 * Created by Jan-work on 27.02.14.
 */

App.User = DS.Model.extend({
	email : DS.attr('string'),
	firstname : DS.attr('string'),
	lastname : DS.attr('string'),
	lastlogin: DS.attr('string'),
	authtoken: DS.attr('string')
});

App.User.FIXTURES = [
	{
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
		authtoken : 'abcde'
	}
];

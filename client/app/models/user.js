'use strict';
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
App.Board = DS.Model.extend({
	name : DS.attr('string'),
	owner: DS.attr('number'),
	creation_date: DS.attr('timestamp'),
	tickets: DS.hasMany('ticket', { async: true })
});


//TODO Fixtures remove fixture data before final release
App.Board.FIXTURES = [
	{
		id: 1,
		name: "Personal Board",
		owner: "User",
		tickets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
	},
	{
		id: 2,
		name: "Other Board",
		owner: "User",
		tickets: [6, 7, 8, 9, 10, 11]
	}
];
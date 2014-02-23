App.Ticket = DS.Model.extend({
	title : DS.attr('string'),
	isDone: DS.attr('boolean')
});


App.Ticket.FIXTURES = [
	{
		id    : 1,
		title : 'Learn Ember.js',
		isDone: true
	},
	{
		id    : 2,
		title : '...',
		isDone: false
	},
	{
		id    : 3,
		title : 'Profit!',
		isDone: false
	}
];
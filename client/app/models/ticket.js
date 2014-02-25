App.Ticket = DS.Model.extend({
	title : DS.attr('string'),
	state: DS.attr('integer'),
	content: DS.attr('string'),
	priority: DS.attr('integer'),
	creation_date: DS.attr('date'),
	last_modify_date: DS.attr('date'),
	isImportant: function() {
		return this.get('priority') == 1;
	}.property('priority'),
	isTodo: function() {
		return this.get('state') == 1;
	}.property('state'),
	isDoing: function() {
		return this.get('state') == 2;
	}.property('state'),
	isDone: function() {
		return this.get('state') == 3;
	}.property('state')
});



App.Ticket.FIXTURES = [
	{
		id    : 1,
		state : 3,
		title : 'Learn Ember.js',
		content: 'Learn Ember.js',
		priority: 1,
		creation_date: new Date(),
		last_modify_date:  new Date()

	},
	{
		id    : 2,
		state : 2,
		title : 'This is a important Ticket',
		content: '...',
		priority: 1,
		creation_date: new Date(),
		last_modify_date: null
	},
	{
		id    : 3,
		state : 1,
		title : 'Profit!',
		content: 'Profit',
		priority: 0,
		creation_date: new Date(),
		last_modify_date: null
	},
	{
		id    : 4,
		state : 1,
		title : '...',
		content: '...',
		priority: 0,
		creation_date: new Date(),
		last_modify_date: null
	},
	{
		id    : 5,
		state : 1,
		title : '...',
		content: '...',
		priority: 0,
		creation_date: new Date(),
		last_modify_date: null
	},
	{
		id    : 6,
		state : 1,
		title : '...',
		content: '...',
		priority: 0,
		creation_date: new Date(),
		last_modify_date: null
	},
	{
		id    : 7,
		state : 2,
		title : '...',
		content: '...',
		priority: 0,
		creation_date: new Date(),
		last_modify_date: new Date()
	},
	{
		id    : 8,
		state : 2,
		title : '...',
		content: '...',
		priority: 0,
		creation_date: new Date(),
		last_modify_date: null
	},
	{
		id    : 9,
		state : 3,
		title : '...',
		content: '...',
		priority: 0,
		creation_date: new Date(),
		last_modify_date: null
	}
];
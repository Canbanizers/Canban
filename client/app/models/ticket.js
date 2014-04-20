App.Ticket = DS.Model.extend({
	board           : DS.belongsTo('board'),
	state           : DS.attr('number'),
	title           : DS.attr('string'),
	content         : DS.attr('string'),
	priority        : DS.attr('number'),
	creation_date   : DS.attr('timestamp'),
	last_modify_date: DS.attr('timestamp'),
	isImportant     : function() {
		return this.get('priority') == 1;
	}.property('priority'),
	isTodo          : function() {
		return this.get('state') == 1;
	}.property('state'),
	isDoing         : function() {
		return this.get('state') == 2;
	}.property('state'),
	isDone          : function() {
		return this.get('state') == 3;
	}.property('state')
});


App.Ticket.FIXTURES = [
	{
		id              : 1,
		board           : 1,
		state           : 3,
		title           : 'Learn Ember.js',
		content         : 'Learn Ember.js',
		ticketNr        : 1,
		priority        : 1,
		creation_date   : new Date(),
		last_modify_date: new Date()

	},
	{
		id              : 2,
		board           : 1,
		state           : 2,
		title           : 'This is an important Ticket',
		content         : '...',
		ticketNr        : 2,
		priority        : 1,
		creation_date   : new Date(),
		last_modify_date: null
	},
	{
		id              : 3,
		board           : 1,
		state           : 1,
		title           : 'Profit!',
		content         : 'Dies hier ist ein Blindtext zum Testen von Textausgaben. Wer diesen Text liest, ist selbst schuld. Der Text gibt lediglich den Grauwert der Schrift an. Ist das wirklich so? Ist es gleichgültig, ob ich schreibe: „Dies ist ein Blindtext“ oder „Huardest gefburn“? Kjift – mitnichten! Ein Blindtext bietet mir wichtige Informationen. An ihm messe ich die Lesbarkeit einer Schrift, ihre Anmutung, wie harmonisch die Figuren zueinander stehen und prüfe, wie breit oder schmal sie läuft. Ein Blindtext sollte möglichst viele verschiedene Buchstaben enthalten und in der Originalsprache gesetzt sein. Er muss keinen Sinn ergeben, sollte aber lesbar sein. Fremdsprachige Texte wie „Lorem ipsum“ dienen nicht dem eigentlichen Zweck, da sie eine falsche Anmutung vermitteln.',
		ticketNr        : 5,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: null
	},
	{
		id              : 4,
		board           : 1,
		state           : 1,
		title           : '...',
		content         : '...',
		ticketNr        : 13,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: null
	},
	{
		id              : 5,
		board           : 1,
		state           : 1,
		title           : '...',
		content         : '...',
		ticketNr        : 7,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: null
	},
	{
		id              : 6,
		board           : 2,
		state           : 1,
		title           : 'Ticket from Other Board',
		content         : '...',
		ticketNr        : 17,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: null
	},
	{
		id              : 7,
		board           : 2,
		state           : 2,
		title           : 'Ticket from Other Board',
		content         : '...',
		ticketNr        : 23,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: new Date()
	},
	{
		id     : 8,
		board  : 2,
		state  : 2,
		title  : 'Ticket from Other Board',
		content: '...',

		ticketNr        : 19,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: null
	},
	{
		id              : 9,
		board           : 2,
		state           : 3,
		title           : 'Ticket from Other Board',
		content         : '...',
		ticketNr        : 34,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: null
	},
	{
		id              : 10,
		board           : 2,
		state           : 1,
		title           : 'Ticket from Other Board',
		content         : '...',
		ticketNr        : 46,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: null
	},
	{
		id              : 11,
		board           : 2,
		state           : 1,
		title           : 'Ticket from Other Board',
		content         : '...',
		ticketNr        : 99,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: null
	},
	{
		id              : 12,
		board           : 1,
		state           : 1,
		title           : '...',
		content         : '...',
		ticketNr        : 26,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: null
	},
	{
		id              : 13,
		board           : 1,
		state           : 1,
		title           : '...',
		content         : '...',
		ticketNr        : 50,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: null
	},
	{
		id              : 14,
		board           : 1,
		state           : 1,
		title           : '...',
		content         : '...',
		ticketNr        : 44,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: null
	},
	{
		id              : 15,
		board           : 1,
		state           : 1,
		title           : '...',
		content         : '...',
		ticketNr        : 39,
		priority        : 0,
		creation_date   : new Date(),
		last_modify_date: null
	}
];
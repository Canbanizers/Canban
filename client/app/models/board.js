App.Board = DS.Model.extend({
	name : DS.attr('string'),
	owner: DS.attr('number'),
	creation_date: DS.attr('timestamp'),
	tickets: DS.hasMany('ticket', { async: true }),
	wip    : DS.attr('number'),
	parent : DS.attr('number')
});
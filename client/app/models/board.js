App.Board = DS.Model.extend({
	name         : DS.attr('string'),
	creation_date: DS.attr('timestamp'),
	tickets      : DS.hasMany('ticket', { async: true }),
	wip          : DS.attr('number'),
	parent       : DS.belongsTo('board', {inverse: 'children'}),
	children     : DS.hasMany('board', {inverse: 'parent'}),
	ticketCount  : function() {
		return this.get('tickets.length')
	}.property('tickets.length'),
	isMainboard  : function() {
		return parseInt(this.get('wip')) === -1;
	}.property('wip')
});
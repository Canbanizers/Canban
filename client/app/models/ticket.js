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
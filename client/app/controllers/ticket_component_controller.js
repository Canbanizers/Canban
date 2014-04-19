App.TicketCompComponent = Ember.Component.extend({
	tagName          : 'article',
	classNames       : ['ticket'],
	classNameBindings: ['basic', 'details', 'edit', 'create', 'ticket.isDone:done', 'ticket.isImportant:important'],
	attributeBindings: ['title'],

	ticket        : null,
	currentBoardID: 0,
	edit          : false,
	details       : false,

	create: function() {
		var creationDate = this.get('ticket.creation_date');
		if (creationDate != null) {
			return false;
		}
		this.send('showCreate');
		return true;
	}.property('ticket.creation_date'),

	basic: function() {
		return !(this.get('edit') || this.get('details') || this.get('create'));
	}.property('details', 'edit', 'create'),

	title: function() {
		if (this.get('details')) {
			return this.get('ticket.title');
		} else if (this.get('edit')) {
			return 'Edit';
		} else if (this.get('create')) {
			return 'Create';
		} else {
			return '';
		}
	}.property('ticket.title', 'basic'),

	displayPrevious: function() {
		return this.get('ticket.state') > 1;
	}.property('ticket.state'),

	displayNext: function() {
		return this.get('ticket.state') < 3;
	}.property('ticket.state'),

	parentBoard: function() {
		return this.get('ticket.board');
	}.property('ticket.board'),

	parentName: function() {
		return this.get('parentBoard.name');
	}.property('parentBoard.name'),

	fromCurrentBoard: function() {
		return this.get('currentBoardID') == this.get('parentBoard.id');
	}.property('currentBoardID', 'parentBoard.id'),

	actions: {
		showParentBoard: function() {
			this.sendAction('showParentBoard', this.get('parentBoard'));
		},

		showDetails: function() {
			Ember.set(this, 'details', true);
			this.send('showDialog', 'details', true);
		},

		showEdit: function() {
			Ember.set(this, 'edit', true);
			this.send('showDialog', 'edit', true);
		},

		showCreate: function() {
			this.send('showDialog', 'create', false);
		},

		toNextColumn: function() {
			var ticket = this.get('ticket');
			var state = ticket.get('state');
			ticket.set('state', state + 1);
			this.sendAction('editAction', ticket);
		},

		toPreviousColumn: function() {
			var ticket = this.get('ticket');
			var state = ticket.get('state');
			ticket.set('state', state - 1);
			this.sendAction('editAction', ticket);
		},

		showDialog: function(type, withPlaceholder) {
			var self = this;

			Ember.run.scheduleOnce('afterRender', this, function() {
				var jqThis = self.$();
				if (withPlaceholder) {
					jqThis.before('<article class="ticket placeholder"></article>');
				}

				jqThis.dialog({
					close: function(event, ui) {
						if (withPlaceholder) {
							$('.ticket.placeholder').remove();
							self.set(type, false);
						} else if (type === 'create') {
							self.set('ticket.creation_date', moment().format('YYYY-MM-DD HH:mm:ss'));
						}
						self.sendAction(type + 'Action', self.get('ticket'));

						jqThis.dialog('destroy');
					}
				});
			});
		}
	}
});
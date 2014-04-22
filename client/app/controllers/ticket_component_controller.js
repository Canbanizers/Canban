App.TicketCompComponent = Ember.Component.extend({
	tagName          : 'article',
	classNames       : ['ticket'],
	classNameBindings: ['basic', 'details', 'edit', 'create', 'ticket.isDone:done', 'ticket.isImportant:important'],
	attributeBindings: ['title'],

	ticket        : null,
	currentBoardID: 0,
	edit          : false,
	details       : false,
	delete: false,
	isDialog: false,

	create: function() {
		var creationDate = this.get('ticket.creation_date');
		if (creationDate != null) {
			return false;
		}
		if (!this.get('isDialog')) {
			this.send('showCreate');
		}
		return true;
	}.property('ticket.creation_date'),

	basic: function() {
		return !(this.get('edit') || this.get('details') || this.get('create') || this.get('delete'));
	}.property('details', 'edit', 'create', 'delete'),

	title: function() {
		if (this.get('details')) {
			return this.get('ticket.title');
		} else if (this.get('edit')) {
			return 'Edit';
		} else if (this.get('create')) {
			return 'Create';
		} else if (this.get('delete')) {
			return 'delete';
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
			var self = this;
			var button = {
				OK: function() {
					self.set('details', false);
					self.$().dialog('close');
				}
			};
			this.send('showDialog', 'details', true, button);
		},

		showEdit: function() {
			this.send('showDialog', 'edit', true);
		},

		showCreate: function() {
			var self = this;
			var buttons = {
				Save  : function() {
					self.$().dialog('close');
					self.set('ticket.creation_date', moment().format('YYYY-MM-DD HH:mm:ss'));
				},
				Cancel: function() {
					self.get('ticket').deleteRecord();
					self.$().remove();
				}
			};
			this.send('showDialog', 'create', false, buttons);
		},

		showDelete: function() {
			this.send('showDialog', 'delete', true)
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

		showDialog: function(type, withPlaceholder, buttons) {
			var self = this;

			if (type !== 'create') {
				self.set(type, true);
			}
			Ember.run.scheduleOnce('afterRender', this, function() {
				var jqThis = self.$();
				if (withPlaceholder) {
					jqThis.before('<article class="ticket placeholder"></article>');
				}
				if (!buttons) {
					buttons = {
						Save  : function() {
							self.$().dialog('close');
						},
						Cancel: function() {
							self.get('ticket').rollback();
							self.set(type, false);
							self.$().dialog('close');
						}
					}
				}
				self.set('isDialog', true);
				jqThis.dialog({
					buttons: buttons,

					close: function(event, ui) {
						if (withPlaceholder) {
							$('.ticket.placeholder').remove();
						}
							if (self.get(type)) {
								if (!event.currentTarget) { // close button at top right of the dialog was clicked
									self.sendAction(type + 'Action', self.get('ticket'));
								}
								if (type !== 'create' && type !== 'delete') {
									self.set(type, false);
								}
							}
						self.set('isDialog', false);
						jqThis.dialog('destroy');

					}
				});
			});
		}
	}
});
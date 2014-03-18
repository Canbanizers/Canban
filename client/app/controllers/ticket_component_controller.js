App.TicketCompComponent = Ember.Component.extend({
	tagName: 'article',
	classNames: ['ticket'],
	classNameBindings: ['basic', 'details', 'edit', 'ticket.isDone:done', 'ticket.isImportant:important'],
	attributeBindings: ['title'],

	ticket: null,
	currentBoardID: 0,
	edit: false,
	details: false,

	basic: function() {
		return !(this.get('edit') || this.get('details'));
	}.property('edit', 'details'),

	title: function() {
		if(this.get('edit')) {
			return 'Edit';
		} else if(this.get('details')) {
			return this.get('ticket.title');
		} else {
			return '';
		}
	}.property('ticket.title', 'basic'),

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
			console.log('TicketCompComponentController.actions.showDetails()');
			Ember.set(this, 'details', true);
			this.send('showDialog', 'details', true);
		},

		showEdit: function() {
			Ember.set(this, 'details', false);
			Ember.set(this, 'edit', true);
			this.send('showDialog', 'edit', true);
		},

		showDialog: function(type, placeholder) {
			var self = this;

			Ember.run.scheduleOnce('afterRender', this, function() {
				var jqThis = self.$();
				if (placeholder) {
					jqThis.before('<article class="ticket placeholder"></article>');
				}

				jqThis.dialog({
					close: function(event, ui) {
						var placeholder = $('.ticket.placeholder');
						if(placeholder.length > 0) {
							$('.ticket.placeholder').remove();
							Ember.set(self, type, false);
						}
						jqThis.dialog("destroy");
					}
				});
			});
		}
	}
});
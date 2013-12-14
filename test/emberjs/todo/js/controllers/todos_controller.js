Todos.TodosController = Ember.ArrayController.extend({
    remaining: function () {
        return this.filterBy('isCompleted', false).get('length');
    }.property('@each.isCompleted'),

    inflection: function () {
        var remaining = this.get('remaining');
        return remaining === 1 ? 'item' : 'items';
    }.property('remaining'),

    hasCompleted: function () {
        return this.get('completed') > 0;
    }.property('completed'),

    completed: function () {
        return this.filterBy('isCompleted', true).get('length');
    }.property('@each.isCompleted'),

    allAreDone: function (key, value) {
        if (value === undefined) {
            return !!this.get('length') && this.everyBy('isCompleted', true);
        } else {
            this.setEach('isCompleted', value);
            this.invoke('save');
            return value;
        }
    }.property('@each.isCompleted'),

    actions: {
		createTodo: function () {
			var title = this.get('newTitle');

			if (!title.trim()) { return; }
			var todo = this.store.createRecord('todo', {
				title: title,
				isCompleted: false
			});

			var isCompleted = this.get('isCompleted');

			this.set('newTitle', '');

			var parameters = {'action' : 'saveNewTicket', 'title' : title};

			var request = $.ajax(({ url: '/Canban/backend/php/factory/models/Tickets.php',
				data: parameters,
				type: 'post'
			}));

			request.done();
			todo.save();
		},
        clearCompleted: function () {
            var completed = this.filterBy('isCompleted', true);
            completed.invoke('deleteRecord');
            completed.invoke('save');
        }
    }
});
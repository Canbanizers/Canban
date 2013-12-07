/**
 * Created by PinkPanther on 06.12.13.
 */
Todos.Todo = DS.Model.extend({
    title: DS.attr('string'),
    isCompleted: DS.attr('boolean')
});
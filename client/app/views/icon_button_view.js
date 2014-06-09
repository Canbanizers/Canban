/**
 * Automatically generates an button with an icon included in bootstrap corresponding to the type property of this view
 * also sends an action on click specified by the action property
 *
 * @type {*|void|Object}
 */
App.IconButtonView = Ember.View.extend({
	tagName          : 'button',
	attributeBindings: ['title'],
	classNames       : ['glyphicon'],
	classNameBindings: ['iconType', 'button:icon_button:icon'],

	action  : null,
	title   : '',
	type    : '',
	iconType: function() {
		return 'glyphicon-' + this.get('type');
	}.property('type'),


	click: function(evt) {
		if (this.get('action')) {
			this.get('controller').send(this.get('action'));
		}
	}
});
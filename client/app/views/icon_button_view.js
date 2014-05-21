App.IconButtonView = Ember.View.extend({
	tagName: 'button',
	attributeBindings: ['title'],
	classNames       : ['glyphicon'],
	classNameBindings: ['iconType', 'button:icon_button:icon'],

	action: null,
	title: '',
	type: '',
	iconType: function() {
		return 'glyphicon-' + this.get('type');
	}.property('type'),


	click: function(evt) {
		if(this.get('action')) {
			this.get('controller').send(this.get('action'));
		}
	}
});
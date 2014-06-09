App.LoginRoute = Ember.Route.extend({
	renderTemplate:function() {
		this._super();
		if(!localStorage['reloaded']) {
			localStorage.clear();
			localStorage['reloaded'] = 'true';
			Ember.run.scheduleOnce('afterRender', this, function() {
				window.location.reload();
			});
		} else {
			delete localStorage['reloaded'];
		}
	}
});
App.LoginRoute = Ember.Route.extend({

	/**
	 * reloads the browser-window one time on entering the LoginRoute
	 * this is needed to fix a bug where the token of a logedout user was still inside the request headers
	 */
	renderTemplate: function() {
		this._super();
		if (!localStorage['reloaded']) {
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
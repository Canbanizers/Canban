'use strict';
window.App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	LOG_TRANSITIONS_INTERNAL: true
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
	this.resource('private_canban', { path: '/' }, function() {
		this.resource('login', {path: '/login'} , function() {
		});
	});
});
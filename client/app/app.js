'use strict';
window.App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
	this.resource('private_canban', { path: '/' }, function() {
		this.route('login', {path: '/login'} , function() {
		});
	});

	this.resource('login', {path: '/login'} , function() {

	});
});
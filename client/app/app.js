'use strict';
window.App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

//App.ApplicationAdapter = DS.RESTAdapter.extend({
//	host: 'http://localhost/canban',
//	namespace: 'backend/php/resttest.php'
//});

App.Router.map(function() {
	this.resource('private_canban', { path: '/' }, function() {
		this.resource('board', {path: '/board/:board_id'}, function(){});
		this.resource('login', {path: '/login'} , function() {
		});
	});
});
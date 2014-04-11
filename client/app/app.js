'use strict';
window.App = Ember.Application.create({
	//for debugging
	LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

//App.ApplicationAdapter = DS.RESTAdapter.extend({
//	host: 'http://localhost/canban',
//	namespace: 'backend/php/resttest.php'
//});

App.Router.map(function () {
	this.resource('private_canban', { path: '/' }, function () {
		this.resource('board', {path: '/board/:board_id'}, function(){});

		this.resource('groups', function(){
			this.resource('group', {path: '/:group_id'}, function(){
				this.route('edit');
			});
			this.route('create');
		});

		this.resource('user', { path:'/user/:user_id' }, function(){
		});
	});
});
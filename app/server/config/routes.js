'use strict';

var util = require('../database/utility.js');

module.exports = function(app, passport) {
	
	app.use(function(request, response, next) {
		console.log('A request has been made to the server');
		next();
	});

	// base route for testing purposes
	// app.get('/', function(request, response) {
	// 	response.json({ message: 'this is a test' });
	// });

	// routing for searchbar
	app.post('/api/search', function(request, response) {
    console.log('received request from searchbar; item is:');
		console.log(request.body);
		console.log('searching for an item');
  	// insert logic for database query
  	util.searchForItemInInventory(request, response);
		// response.send(200); // Response to be handled by utility function
	});

	// routes for managing inventory
	app.post('/inventory', function(request, response) {
  	console.log('adding a new item to user inventory');
  	// insert logic for database query
  	// util.addItemToInventory();
  	response.send(200);
  });

  // remove item from inventory
  app.post('/remove', function(request, response) {
  	console.log('removing an existing item from user inventory');
  	// insert logic for database query
  	// util.removeItemFromInventory();
  	response.send(200);
  });

  // for facebook login/authentication
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  // handle the callback after facebook has verified the user
  app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(request, response) {
  	console.log('user authenticated via facebook');
  	response.send(200);
  });

  // handle logout/session end
  app.get('/logout', function(request, response) {
  	console.log('user is logging out');
  	request.logout();
  	response.send(200);
  });
};

// Utility functions:
var isLoggedIn = function(request, response, next) {
	if (request.isAuthenticated()) {
		return next();
	}

	console.log('not logged in');
	response.send(200);
};

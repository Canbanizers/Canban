App.TicketAdapter = App.ApplicationAdapter.extend({

	ajaxError: function(jqXHR) {
		var error = this._super(jqXHR);
		if (jqXHR && jqXHR.status === 500) {
			var errorArray = jqXHR.responseJSON.error.split(',');
			return {
				serverError : 500,
				sqlState : errorArray[0],
				sqlError : errorArray[1],
				errorMessage: errorArray[2]
			}
		} else {
			return error;
		}
	}
});
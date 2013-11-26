module.exports = {
	ServerError: function(message) { 
		return { code: 500, message: message };
	},
	SecurityError: function(message) { 
		return { code: 403, message: message };
	}
}
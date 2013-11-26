define(['knockout'], function(ko) {
	return function Bill(id, data, fireRef) {
		var self = this,
			data = data || {};

		self.id = id;
		ko.fireModel(self, {
			name: data.name || '',
			dueDate: data.dueDate || '',
			amount: data.amount || 0
		}, fireRef);
	}
});
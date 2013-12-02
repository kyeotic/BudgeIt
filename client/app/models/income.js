define(['knockout'], function(ko) {
	var Income =  function Income(fireRef) {
		var self = this;

		ko.fireModel(self, {
			amount: 0,
			frequency: '',
			payDate: ''
		}, fireRef);
	};

	Income.prototype.frequencyOptions = ['Weekly', '2 Weeks', '1/2 Month', 'Monthly'];

	return new Income();
});
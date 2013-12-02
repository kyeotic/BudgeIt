define(['knockout', 'durandal/app', 'services/firebase', 'models/bill', 'models/income'], 
function(ko, app, firebase, Bill, income) {

	return function Bills() {
		var self = this;

		self.bills = ko.fireSet(firebase.root.child('bills'), Bill);
		self.income = income;

		self.newBill = function() {
			self.bills.push({});
		};

		self.totalAmount = ko.computed(function() {
			return self.bills().sum(function(b) {
				return b.amount().toNumber();
			});
		});
	};
});
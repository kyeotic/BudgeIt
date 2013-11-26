define(['knockout', 'durandal/app', 'services/firebase', 'models/bill'], 
function(ko, app, firebase, Bill) {
	return function Bills() {
		var self = this;

		self.bills = ko.fireSet(firebase.root.child('bills'), Bill);

		self.newBill = function() {
			self.bills.push({name: 'new'});
		};

		self.totalBurden = ko.computed(function() {
			return self.bills().sum(function(b) {
				return b.amount().toNumber();
			});
		});
	};
});
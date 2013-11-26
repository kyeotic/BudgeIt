define(['knockout', 'firebase'], 
function(ko, Firebase) {
	return new Firebase('https://budgeit.firebaseio.com/');
});
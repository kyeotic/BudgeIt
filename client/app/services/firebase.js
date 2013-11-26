define(['knockout', 'firebase'], 
function(ko, Firebase) {
	var source = new Firebase('https://budgeit.firebaseio.com/');
	return {
		source: source,
		setRoot: function(id) {
			this.root = source.child('users').child(id);
		},
		root: null
	}
});
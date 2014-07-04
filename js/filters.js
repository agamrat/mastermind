angular.module('App').filter('range', function() {
	return function(input) { var result=[];
	input = parseInt(input);
	for(var i = 0; i < input; i++) {
		result.push(i);
	}
	return result;
};
});

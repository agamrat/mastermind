angular.module('App').service('utilService', function() {

	function countOccurrences(arr) {
		var result ={};
		console.log("starting count occurrences");
		for(var i in arr) {
			console.log(JSON.stringify(result));
			if(!result[arr[i]]) {
				result[arr[i]] = 0;
			}
			result[arr[i]] =result[arr[i]]+1;
			console.log("incrementing " + result[arr[i]] +" where arr[i] "+ arr[i]);
		}
		return result;

	};

	return {
		countOccurrences : function(a) { return countOccurrences(a);}

	};

});

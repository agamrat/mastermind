angular.module('App').controller('gameController', ['$scope', 'guessService', function($scope, guessService) {

$scope.colors = guessService.getColors();
$scope.curGuesses = guessService.getColors();
$scope.instance = guessService.create();

$scope.toggle = function(color, index) {
	console.log("toggling");
	if(color == $scope.colors[$scope.colors.length -1]) {
		$scope.curGuesses[index] = $scope.colors[0];
		return;
	}
	console.log("scope colors index at "+$scope.colors.indexOf(color) );
	$scope.curGuesses[index] = $scope.colors[$scope.colors.indexOf(color) +1];

	
};
$scope.makeGuess = function(g) {
	$scope.instance.takeGuess(g);
};
$scope.pegClass = function(peg) {
	if(peg=='white') {
		return { pegblock:true, black:false, white:true};
	}
	return { pegblock:true, white:false, black:true};
};

$scope.colorClass = function(trueColor) {
	var result = {};
	for(var i =0; i< $scope.colors.length; i++) {
		result[$scope.colors[i]] = false;
	}
	result[trueColor]=true;
	result['colorblock'] = true;
	return result;
};

}]);

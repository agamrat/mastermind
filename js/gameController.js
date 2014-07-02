var initCtrl = ['$scope','$modalInstance', function($scope, $modalInstance)
{
	$scope.form={
		guessSize:10,
		gameSize:4
	};
	$scope.startGame = function() {
		$modalInstance.close($scope.form);
	};
}];

angular.module('App').controller('gameController', ['$scope', 'guessService','$modal', function($scope, guessService, $modal) {

$scope.open = function () {
  var modalInstance = $modal.open({
      templateUrl: 'partials/initForm.html',
       controller: initCtrl,
      size: 'md'
    });
  modalInstance.result.then(function (form) {	
	$scope.instance = guessService.create(form.guessLength, form.gameSize);
	console.log("guess template is " + $scope.instance.guessTemplate());
	$scope.cur = $scope.instance.guessTemplate();
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };
  



$scope.open();

$scope.colors = guessService.getColors();


$scope.init = function() {
	$scope.open();
}

$scope.toggle = function(color, index) {
	console.log("toggling");
	if(color == $scope.colors[$scope.colors.length -1]) {
		$scope.cur[index] = $scope.colors[0];
		return;
	}
	console.log("scope colors index at "+$scope.colors.indexOf(color) );
	$scope.cur[index] = $scope.colors[$scope.colors.indexOf(color) +1];

	
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

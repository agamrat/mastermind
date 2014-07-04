angular.module('App').controller('initCtrl', ['$scope','$modalInstance', function($scope, $modalInstance)
{
	$scope.form={
		guessSize:10,
		gameSize:4
	};
	$scope.startGame = function() {
		$modalInstance.close($scope.form);
	};
}]);

angular.module('App').controller('endModalCtrl', ['$scope','$modalInstance','params', function($scope, $modalInstance, params)
{
	$scope.params = params;
	$scope.play = function() {
		$modalInstance.close();
	};
}]);


angular.module('App').controller('gameController', ['$scope', 'guessService','$modal', function($scope, guessService, $modal) {

$scope.init = function () {
  var modalInstance = $modal.open({
      templateUrl: 'partials/initForm.html',
       controller: 'initCtrl',
      size: 'md'
    });
  modalInstance.result.then(function (form) {	
	$scope.instance = guessService.create(form.guessSize, form.gameSize);
	console.log("guess template is " + $scope.instance.guessTemplate());
	$scope.cur = $scope.instance.guessTemplate();
    });
  };
  

$scope.end = function (modalTitle) {
  var modalInstance = $modal.open({
      templateUrl: 'partials/endModal.html',
       controller: 'endModalCtrl',
      	size: 'md',
	resolve: {
		params : function() {
			return  {
				answer: $scope.instance.game.answer,
				title : modalTitle,
				colorClass : $scope.colorClass
		};
	}
	}
    });
  modalInstance.result.then(function () {	
	$scope.init();
    });
  };

$scope.init();

$scope.colors = guessService.getColors();



$scope.toggle = function(color, index) {
	if(color == $scope.colors[$scope.colors.length -1]) {
		$scope.cur[index] = $scope.colors[0];
		return;
	}
	$scope.cur[index] = $scope.colors[$scope.colors.indexOf(color) +1];

	
};


$scope.makeGuess = function(g) {
	$scope.instance.takeGuess(g);
	if($scope.instance.won) {
		$scope.end('You won!');
	}
	else if($scope.instance.finished) {
		$scope.end('Game over.');
	}

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

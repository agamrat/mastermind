angular.module('App').factory('guessService', ['gameService', function(gameService) {

	function Instance() {
		this.game = gameService.init();
		this.guess = [];
		this.guessLimit = 10;
		this.finished = false;
	};
	Instance.prototype.isFinished = function() {

		return this.finished;
	};
	
	Instance.prototype.getGameSize = function() {
		return this.game.gameSize;
	};

	Instance.prototype.hasGuess = function() {
		return this.guess.length < this.guessLimit;
	};

	Instance.prototype.takeGuess = function(g) {
		var r =  this.game.evaluate(g);
		this.guess.push({guess: angular.copy(g), result: r});
		if(r == ['white']) { //TODO: check if r is completely white
			this.finished = true;
		}
	};
	
	function getColors() {
		return gameService.getColors();
	};

	function create() {
		return new Instance();
	};

	return {
		create : function() { return create(); },
		getColors: function() { return getColors(); }
	};
}]);

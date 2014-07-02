angular.module('App').factory('guessService', ['gameService', function(gameService) {

	function Instance(limit, gameSize) {
		console.log("gamesize is " + gameSize);
		this.game = gameService.init(gameSize);
		this.guess = [];
		this.guessLimit = limit;
		this.finished = false;
		this.won = false;
	};
	Instance.prototype.isWon = function() {
		return this.won;
	};
	Instance.prototype.isFinished = function() {

		return this.finished;
	};
	Instance.prototype.guessTemplate = function() {
		return gameService.init(this.game.gameSize).answer;
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
		if(this.guess.length == this.guessLimit) {
			this.finished=true;
	
		}
		if(r.length == g.length) {
		for(var i in r) {
			if(r[i] !== 'white') {
				return;
			}
		}
		this.won = true;
	
		}
	};
	
	function getColors() {
		return gameService.getColors();
	};

	function create(limit, gameSize) {
		return new Instance(limit, gameSize);
	};

	return {
		create : function(limit, gameSize) { return create(limit, gameSize); },
		getColors: function() { return getColors(); }
	};
}]);

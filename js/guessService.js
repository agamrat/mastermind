angular.module('App').factory('guessService', ['gameService', function(gameService) {

	function Instance(limit) {
		this.game = gameService.init();
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

	function create(limit) {
		return new Instance(limit);
	};

	return {
		create : function(limit) { return create(limit); },
		getColors: function() { return getColors(); }
	};
}]);

angular.module('App').factory('gameService', [function() {


	function getColors() {
		return ['blue','yellow', 'green', 'red'];
	};
	function randomIndex(len) {
 		return Math.floor(Math.random() * len);

	};
	
	function createAnswer(gameSize) {
		var choices = getColors();
		var answer =[];

		for(var i=0; i< gameSize; i++) {
			var index =  randomIndex(choices.length);
			answer.push(choices[index]);
		}	

		return answer;
	}





	function Game() {
		this.answer = createAnswer(4);
		this.gameSize = this.answer.length;

	};


	Game.prototype.evaluate = function(guess) {
		



		//TODO: logic
		return  ['white','black','black'];


	};

	function init() {
		return new Game();

	};

	


	return {
		init: function() { return init(); },
		getColors: function() { return getColors(); },
	};

}]);

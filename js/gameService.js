angular.module('App').factory('gameService', ['utilService', function(utilService) {


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
		var result = [];
		
		var guessFree = [];
		var answerFree = [];
		for(var i in guess) {
			if(guess[i] == this.answer[i]) {
				result.push('white');
			}
			else {
				guessFree.push(guess[i]);
				answerFree.push(this.answer[i]);
			}
		
		}
		

		guessFree = utilService.countOccurrences(guessFree);
		answerFree = utilService.countOccurrences(answerFree);

		

		for(var key in guessFree) {
			console.log("key is " + key);
			if(guessFree.hasOwnProperty(key) && answerFree[key] != undefined) {
			var overlap = Math.min(guessFree[key], answerFree[key]);
			console.log("For color " + guessFree[i] + " overlap is " + overlap);
			for(var j = 1; j < overlap+1; j++) {
				result.push('black');
			}
			}
		}


		return result;


	};

	function init() {
		return new Game();

	};

	


	return {
		init: function() { return init(); },
		getColors: function() { return getColors(); },
	};

}]);

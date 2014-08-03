$(document).ready(function(){
	require(['/javascripts/sudoku.js'], function(Sudoku){

		var board = [
			["5", "3", "", "", "7", "", "", "", ""],
			["6", "", "", "1", "9", "5", "", "", ""],
			["", "9", "8", "", "", "", "", "6", ""],
			["8", "", "", "", "6", "", "", "", "3"],
			["4", "", "", "8", "", "3", "", "", "1"],
			["7", "", "", "", "2", "", "", "", "6"],
			["", "6", "", "", "", "", "2", "8", ""],
			["", "", "", "4", "1", "9", "", "", "5"],
			["", "", "", "", "8", "", "", "7", "9"]
		];

		function _renderBoard(board) {

			$('#sudoku-form').empty();

			var sudokuHtml = new EJS({url: '/javascripts/templates/board.ejs'}).render({
				'board' : board
			});

			$('#sudoku-form').prepend(sudokuHtml);
		}

		// render initial puzzle
		_renderBoard(board);

		var sudoku = new Sudoku();

		$('#validate').click(function(e){
			var rawData = $('#sudoku-form').serializeArray();
			var boardData = [[],[],[],[],[],[],[],[],[]];

			$.each(rawData, function(i, d){
				var coords = d.name.split('_');
				boardData[coords[0]][coords[1]] = d.value;
			});

			if (sudoku.validateSoduku(boardData)){
				alert("You are genius! You solved the puzzle.");
			}
			else {
				alert("Incorrect solution. Try again.");
			}

			return false;
		});

		$('#next').click(function(e){
			board = sudoku.generateSoduku();
			_renderBoard(board);

			return false;
		});
	});
});
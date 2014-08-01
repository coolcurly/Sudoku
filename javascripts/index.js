$(document).ready(function(){
	require(['/javascripts/sudoku.js'], function(Sudoku){
		var sudoku = new Sudoku();

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

		var sudokuHtml = new EJS({url: '/javascripts/templates/board.ejs'}).render({
			'board' : board
		});

		$('#sudoku-form').prepend(sudokuHtml);

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
	});
});
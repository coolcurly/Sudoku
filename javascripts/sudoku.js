(function() {
  define([], function() {
    var Sudoku;
    return Sudoku = (function() {

      //////////////// contructor ////////////////////
      function Sudoku(options) {}



      //////////////// private methods ///////////////

      // chceck if board matrix only contains alid data
      function _validateBoard(board) {
        for (var i = 0; i < 9; i++) {
          for (j = 0; j < 9; j++) {
            var val = parseInt(board[i][j]);
            if (!val || val < 1 || val > 9) {
              return false;
            }
          }
        }
        return true;
      };


      // find all numbers which are in the same row or column or 3x3 grid with the number at position(i, j),
      // and save the numbers to 'numbers' array
      function _markNonAvailableNumbers(board, numbers, i, j) {
        for (var k = 0; k < 9; k++) {
          var number = parseInt(board[i][k]);
          if (number) numbers[number - 1] = 1;

          number = parseInt(board[k][j]);
          if (number) numbers[number - 1] = 1;

          var offsetX = (Math.floor(i / 3) * 3),
            offsetY = (Math.floor(j / 3) * 3);
          number = board[offsetX + Math.floor(k / 3)][offsetY + Math.floor(k % 3)];
          if (number) numbers[number - 1] = 1;
        }
      };


      // validate if a sudoku has unique solution
      function _isSolutionUnique(board) {

        function _solveSudokuDFS(board, result) {
          for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {

              // find a slot to fill
              if (!board[i][j]) {

                var numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0];

                _markNonAvailableNumbers(board, numbers, i, j);

                for (var k = 0; k < numbers.length; k++) {

                  if (numbers[k] === 0) {
                    board[i][j] = k + 1;
                    _solveSudokuDFS(board, result);
                  }
                }
                board[i][j] = "";
                return;
              }
            }
          }
          result.count++;
        };


        var result = {
          count: 0
        };

        _solveSudokuDFS(board, result);
        return result.count == 1;
      };


      // generate a valid soduku solution with all 81 cells filed with legit numbers
      function _generateValidBoard(board) {
        for (var i = 0; i < 9; i++) {
          for (var j = 0; j < 9; j++) {

            // find a slot to fill
            if (!board[i][j]) {

              var numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0];

              _markNonAvailableNumbers(board, numbers, i, j);

              var availableNumbers = [];

              for (var k = 0; k < numbers.length; k++) {
                if (numbers[k] === 0) availableNumbers.push(k);
              }

              while (availableNumbers.length > 0) {
                var index = Math.floor((Math.random() * 100) + 1) % availableNumbers.length;
                board[i][j] = availableNumbers[index] + 1;
                if (_generateValidBoard(board)) return true;
                else board[i][j] = "";
                availableNumbers.splice(index, 1);
              }

              return false;;
            }
          }
        }

        return true;
      };


      // erase cells from a sudoku solution
      function _eraseCells(board) {
        // decide how many cells to erase (between 50 and 60)
        var cellsToErase = Math.floor((Math.random() * 1000) + 1) % 10 + 50;

        for (var n = 0; n < cellsToErase; n++) {
          while (true) {
            var index = Math.floor((Math.random() * 10000) + 1) % 81;
            var i = Math.floor(index / 9);
            var j = index % 9;

            var count = 0;
            for (var k = 0; k < 9; k++) {
              if (board[i][k]) count++;
            }
            if (count == 1) continue;

            count = 0;
            for (var k = 0; k < 9; k++) {
              if (board[k][j]) count++;
            }
            if (count == 1) continue;

            count = 0;
            var offsetX = Math.floor(i / 3) * 3,
              offsetY = Math.floor(j / 3) * 3;
            for (var k = 0; k < 9; k++) {
              if (board[offsetX + Math.floor(k / 3)][offsetY + j % 3]) count++;
            }
            if (count == 1) continue;

            board[i][j] = "";
            break;
          }
        }
      };


      /////////////// public methods ///////////////////

      // validate if a board is a valid board
      // board is a 2D array
      Sudoku.prototype.validateSoduku = function(board) {
        if (!_validateBoard(board)) {
          return false;
        }

        // validate rows
        for (var i = 0; i < 9; i++) {
          var numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0];

          for (var j = 0; j < 9; j++) {
            numbers[board[i][j] - 1] = 1;
          }

          if (numbers.join('') !== "111111111") return false;
        }

        // validate columns
        for (var i = 0; i < 9; i++) {
          var numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0];

          for (var j = 0; j < 9; j++) {
            numbers[board[j][i] - 1] = 1;
          }

          if (numbers.join('') !== "111111111") return false;
        }

        // validte 3x3 grids
        for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
            var numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (var k = 0; k < 9; k++) {
              numbers[board[i * 3 + Math.floor(k / 3)][j * 3 + k % 3] - 1] = 1;
            }

            if (numbers.join('') !== "111111111") return false;
          }
        }

        return true;

      };

      // generate a soduku
      Sudoku.prototype.generateSoduku = function() {
        var testBoard = null;
        var board = null;
        do {
          board = [
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""]
          ];

          // generate a solution first
          _generateValidBoard(board);

          // erase some cells to make a puzzle
          _eraseCells(board);

        } while (!_isSolutionUnique(board)); // keep trying if solution is not unique

        return board;

      };

      return Sudoku;

    })();
  });

}).call(this);
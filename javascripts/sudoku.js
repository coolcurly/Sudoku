(function() {
  define([], function() {
    var Sudoku;
    return Sudoku = (function() {
      function Sudoku(options) {}


      // internal method
      Sudoku.prototype._validateBoard = function(board) {
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


      // validate if a board is a valid board
      Sudoku.prototype.validateSoduku = function(board) {
        if (!this._validateBoard(board)) {
          return false;
        }

        // validate rows
        for (var i = 0; i < 9; i++) {
          var digits = [0,0,0,0,0,0,0,0,0];
          
          for (var j = 0; j < 9; j++) {
            digits[board[i][j] - 1] = 1;
          }

          if (digits.join('') !== "111111111") return false;
        }

        // validate columns
        for (var i = 0; i < 9; i++) {
          var digits = [0,0,0,0,0,0,0,0,0];

          for (var j = 0; j < 9; j++) {
            digits[board[j][i] - 1] = 1;
          }

          if (digits.join('') !== "111111111") return false;
        }

        // validte 3x3 grids
        for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
            var digits = [0,0,0,0,0,0,0,0,0];
            for (var k = 0; k < 9; k++) {
              digits[board[i*3 + Math.floor(k/3)][j*3 + k%3] - 1] = 1;
            }

            if (digits.join('') !== "111111111") return false;
          }
        }
        
        return true;

      };

      //TODO: board generator
      Sudoku.prototype.generateSoduku = function(){};

      return Sudoku;

    })();
  });

}).call(this);

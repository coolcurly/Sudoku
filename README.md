The sudoku game is deployed to: http://easy-sudoku.herokuapp.com/

What is sudoku? Read http://en.wikipedia.org/wiki/Sudoku

## Supported browsers
Latest Firefox/Chrome/Safari, IE 10 and above, Android/iOS browsers. Might also be compatible with other mordern browers.

## Test and run
Any web server (nginx/Apache) should be able to serve Sudoku game. A simpler way to test the game is to use Python.

1. At the command prompt, change directory to project path

2. At the command prompt:
        python -m SimpleHTTPServer 8000

6. Open your favorite browser and access `http://localhost:8000`

## Source code guide
`index.html` is the only html document, which structures the game's layout. 

`images` contains a favorite icon file. 

`javascripts/templates/board.ejs` is a ejs template file. EJS template makes data rendering very easy. Source code is uncluttered from the logic that deals with HTML generating. See http://embeddedjs.com

`javascripts/vendor/require.min.js` is the `require` library file. RequireJS is a javascript file loader. With RequireJS, javascript code could be organized in a more modular way. Name conflicts could be avoided.

`javascripts/vendor/ejs_production.js` is ejs library file.

`javascripts/index.js` controls the game page. All user actions events are handled here. jQuery is used for setting up event listeners and DOM operations.

`javascripts/sudoku.js` defines `Sudoku` class. `Sudoku` class contains a few methods that generate and validate sudoku.

`stylesheets/controls.css and sudoku.css` are generated from sass files.

`sass/_mixins.scss` defines mixins that are used by other sass files.

`sass/controls.scss` contains styles for buttons.

`sass/sudoku.scss` is the main style file. Media query is used for better rendering for different screen sizes.

## Acknowledgement
favicon is from http://www.iconarchive.com/show/minimalism-icons-by-xenatt/App-Sudoku-icon.html

User friendliness could be improved. Entering numbers in input boxes could hurt user experience for a mobile user. In landscape mode, it is hard for user to enter at the correct box especially when soft keyboard is shown.

UI could be prettier. Add a sass theme file with variables that can control page's look could be beneficial.

Sudoku generator code is not optimized. Algorithms could be tuned to be more effective.

No test code is written.
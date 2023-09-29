export const tic = (function() {
	
	const GameBoard = function(rows = 3, columns = 3){
		const row = rows;
		const col = columns;
		let board = [];
		for(let i=0; i<row; i++) {
			board[i] = [];
			for(let j=0; j<col; j++) {
				board[i][j] = null;
			};
		}
		return board;
	}
	
	const displayController = (function() {
		const board = GameBoard();
		const boardElem = document.querySelector('.board');
		board.forEach((row, rowIndex) => {
			row.forEach((tile, tileIndex) => {
				const tileElem = document.createElement('div');
				tileElem.dataset.tile = 'Row-' + (rowIndex+1) + ' Tile-' + (tileIndex+1);
				boardElem.appendChild(tileElem);
			});
			
			// board based on rows and columns (having display issues)
			
			//~ const rowElem = document.createElement('div');
			//~ rowElem.dataset.row = 'Row-' + (index+1);
			//~ row.forEach((tile,index) => {
				//~ const tileElem = document.createElement('span');
				//~ tileElem.dataset.tile = 'Tile-' + (index+1);
				//~ rowElem.appendChild(tileElem);
			//~ });
			//~ boardElem.appendChild(rowElem);
			
		});
		
		
	})();
	
	const GameController = (function(playerOne = 'Player 1', playerTwo = 'Player 2') {
		const players = [
		{
			name: playerOne,
			token: 'X'
		},
		{
			name: playerTwo,
			token: 'O'
		}
		]
		
		let activePlayer = players[0];
		
		//function to switch player
		const switchPlayer = () => {
			activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];
			return activePlayer;
		}
		const boardElem = document.querySelector('.board');
		const messageBoard = document.querySelector('.message-board');
		messageBoard.textContent = players[0].name;
		
		boardElem.addEventListener('click', updateNameBoard(activePlayer.name));
		
		function updateNameBoard(message){
			messageBoard.textContent = message;
		};
		
		function updateTile(e) {
			if (e.target.textContent == '') {
				e.target.textContent = activePlayer.token;
				let winner = checkWinner();
				if (winner === undefined) {
					activePlayer = switchPlayer();
					updateNameBoard(activePlayer.name);
				} else {
					let won = winner + ' is the Winner'
					updateNameBoard(won);
					endGame();
					button.textContent = 'Start New Game';
					button.classList.remove('btn-warning');
					button.classList.add('btn-success');
				}
			} else {
				return;
			}
		};
		
		//function to check for winner
		function checkWinner() {
			const tiles = document.querySelectorAll('[data-tile]');
			if(tiles[0].textContent === activePlayer.token && tiles[1].textContent === activePlayer.token && tiles[2].textContent === activePlayer.token ||
				tiles[3].textContent === activePlayer.token && tiles[4].textContent === activePlayer.token && tiles[5].textContent === activePlayer.token ||
				tiles[6].textContent === activePlayer.token && tiles[7].textContent === activePlayer.token && tiles[8].textContent === activePlayer.token ||
				tiles[0].textContent === activePlayer.token && tiles[4].textContent === activePlayer.token && tiles[8].textContent === activePlayer.token ||
				tiles[2].textContent === activePlayer.token && tiles[4].textContent === activePlayer.token && tiles[6].textContent === activePlayer.token ||
				tiles[0].textContent === activePlayer.token && tiles[3].textContent === activePlayer.token && tiles[6].textContent === activePlayer.token ||
				tiles[1].textContent === activePlayer.token && tiles[4].textContent === activePlayer.token && tiles[7].textContent === activePlayer.token ||
				tiles[3].textContent === activePlayer.token && tiles[5].textContent === activePlayer.token && tiles[8].textContent === activePlayer.token) {
					return activePlayer.name;
			}
		}
		
		// function to start Game
		function startGame(){
			if(button.textContent == 'Game Started') return;
			clearBoard();
			button.textContent = 'Game Started';
			button.classList.remove('btn-success');
			button.classList.add('btn-warning');
			boardElem.addEventListener('click', updateNameBoard(activePlayer.name));
			boardElem.addEventListener('click', updateTile);
			
		};
		
		// function to end Game
		function endGame(){
			
			boardElem.removeEventListener('click', updateTile);
			boardElem.removeEventListener('click', updateNameBoard);
		};
		
		function clearBoard() {
			const tiles = document.querySelectorAll('[data-tile]');
			tiles.forEach(tile => {
				tile.textContent = null;
			});
		};
		
		return { startGame }
		
	})();
	
	const button = document.querySelector('button');
	button.addEventListener('click', GameController.startGame);
	
	
})();

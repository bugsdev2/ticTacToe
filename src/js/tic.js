export const tic = (function() {
	
	const GameBoard = function(rows = 3, columns = 3){
		const row = rows;
		const col = columns;
		let board = [];
		for(let i=0; i<row; i++) {
			board[i] = [];
			for(let j=0; j<col; j++) {
				board[i][j] = ' ';
			};
		}
		return board;
	}
	
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
		const currentPlayerElem = document.querySelector('.current-player');
		currentPlayerElem.textContent = players[0].name;
		boardElem.addEventListener('click', updateTile);
		boardElem.addEventListener('click', updateNameBoard);
		
		function updateNameBoard(e){
			currentPlayerElem.textContent = activePlayer.name;
		};
		
		function updateTile(e) {
		if (e.target.textContent == ' ') {
			e.target.textContent = activePlayer.token;
			activePlayer = switchPlayer();
		} else {
			return;
		}
	};
		
		return { switchPlayer }
		
	})();
	
	const displayController = (function() {
		const board = GameBoard();
		const boardElem = document.querySelector('.board');
		board.forEach(row => {
			row.forEach(tile => {
				const tileElem = document.createElement('div');
				tileElem.textContent = tile;
				tileElem.dataset.tile= tile;
				boardElem.appendChild(tileElem);
			});
		});
		
		
	})();
	
	
})();

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
				tileElem.dataset.tile = (rowIndex+1) + '-' + (tileIndex+1);
				boardElem.appendChild(tileElem);
			});
		});
		
		// function to clear board
		function clearBoard() {
			const tiles = document.querySelectorAll('[data-tile]');
			tiles.forEach(tile => {
				tile.textContent = null;
			});
		};
		
		// function to update the message board
		function updateNameBoard(message){
			const messageBoard = document.querySelector('.message-board');
			messageBoard.value = message;
		};
		
		return { clearBoard, updateNameBoard }
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
		
		
		
		boardElem.addEventListener('click', displayController.updateNameBoard(activePlayer.name));
		
		// function to get player tile
		function getPlayerTile(e){
			const tileElem = e.target;
			updateTile(tileElem);
			applyAIEasy();
		};
		
		function updateTile(tileElem) {
			if (tileElem.textContent == '') {
				tileElem.textContent = activePlayer.token;
				let winner = getWinner();
				if (winner === undefined) {
					let length = checkTileAvailability().length;
					if(length === 0) {
						displayController.updateNameBoard('It is a Tie');
						endGame();
						boardElem.style.setProperty('opacity', '0.3');
						hideStartBtn();
						showPlayerBtns();
						startButton.textContent = 'Start New Game';
						startButton.classList.remove('btn-warning');
						startButton.classList.add('btn-success');
						enableUserClick();
					} else {
						activePlayer = switchPlayer();
						displayController.updateNameBoard(activePlayer.name);
						enableUserClick();
					}
				} else {
					let won = winner + ' is the Winner'
					displayController.updateNameBoard(won);
					endGame();
					hideStartBtn();
					showPlayerBtns();
					boardElem.style.setProperty('opacity', '0.3');
					startButton.textContent = 'Start New Game';
					startButton.classList.remove('btn-warning');
					startButton.classList.add('btn-success');
					enableUserClick();
				}
			} else {
				return;
			}
		};
		
		//function to check for winner
		function getWinner() {
			const tiles = document.querySelectorAll('[data-tile]');
			if(tiles[0].textContent === activePlayer.token && tiles[1].textContent === activePlayer.token && tiles[2].textContent === activePlayer.token ||
				tiles[3].textContent === activePlayer.token && tiles[4].textContent === activePlayer.token && tiles[5].textContent === activePlayer.token ||
				tiles[6].textContent === activePlayer.token && tiles[7].textContent === activePlayer.token && tiles[8].textContent === activePlayer.token ||
				tiles[0].textContent === activePlayer.token && tiles[4].textContent === activePlayer.token && tiles[8].textContent === activePlayer.token ||
				tiles[2].textContent === activePlayer.token && tiles[4].textContent === activePlayer.token && tiles[6].textContent === activePlayer.token ||
				tiles[0].textContent === activePlayer.token && tiles[3].textContent === activePlayer.token && tiles[6].textContent === activePlayer.token ||
				tiles[1].textContent === activePlayer.token && tiles[4].textContent === activePlayer.token && tiles[7].textContent === activePlayer.token ||
				tiles[2].textContent === activePlayer.token && tiles[5].textContent === activePlayer.token && tiles[8].textContent === activePlayer.token) {
					return activePlayer.name;
			}
		}
		
		// function to start Game
		function startGame(){
			if(startButton.textContent == 'Game Started') return;
			displayController.clearBoard();
			boardElem.style.removeProperty('opacity');
			startButton.textContent = 'Game Started';
			startButton.classList.remove('btn-success');
			startButton.classList.add('btn-warning');
			boardElem.addEventListener('click', displayController.updateNameBoard(activePlayer.name));
			boardElem.addEventListener('click', getPlayerTile);
		};
		
		// function to end Game
		function endGame(){
			
			boardElem.removeEventListener('click', getPlayerTile);
			boardElem.removeEventListener('click', displayController.updateNameBoard);
		};
		
		
		
		// function to check the current game state
		function checkGameState(){
			const tiles = document.querySelectorAll('[data-tile]');
			const gameState = [];
			tiles.forEach(tile => {
				if(tile.textContent == '') {
					gameState.push('');
				} else {
					gameState.push(tile.textContent);
				}
			});
		};
		
		
		// function to check available tiles
		function checkTileAvailability(){
			const tiles = document.querySelectorAll('[data-tile]');
			const availableTiles = []; 
			tiles.forEach(tile => {
				if (tile.textContent === '') {
					availableTiles.push(tile);
				}
			});
			return availableTiles;
		};
		
		
		// ai player function (easy mode using random function)
		function aiEasy(){
			let availableTiles = checkTileAvailability();
			let selectedTile = availableTiles[randomize(availableTiles.length)];
			setTimeout(()=> {
				updateTile(selectedTile);
			}, 1000);
		};
		
		function randomize(num) {
			return Math.floor(Math.random()*num);
		};
		
		// implement aiEasy
		function applyAIEasy(){
			
			const messageBoard = document.querySelector('.message-board');
			const event = new Event('input');
			messageBoard.addEventListener('input', () => {
				if (messageBoard.value == 'Computer') {
					aiEasy();
					disableUserClick();
				}
			}, { once: true });
			messageBoard.dispatchEvent(event);
		};
		
		
		function disableUserClick(){
			document.addEventListener('click', disableClick) 
		};
		
		function enableUserClick(){
			document.removeEventListener('click', disableClick);
		};
		
		function disableClick(e){
			e.stopPropagation();
			e.preventDefault();	
		};
		
		return { startGame, players, aiEasy }

	})();
	
	const startButton = document.querySelector('.start-btn');
	startButton.addEventListener('click', GameController.startGame);
	
	const playerButtons = document.querySelectorAll('.player');
		playerButtons.forEach(button => {
			button.addEventListener('click', updatePlayerInfo);
		});
		
	function hideStartBtn(){
		startButton.style.setProperty('display', 'none');
		};
		
	function showStartBtn(){
		startButton.style.setProperty('display', 'block');
	};
		
		
	function hidePlayerBtns(){
		playerButtons[0].style.setProperty('display', 'none');
		playerButtons[1].style.setProperty('display', 'none');
	};
	
	function showPlayerBtns(){
		playerButtons[0].style.setProperty('display', 'block');
		playerButtons[1].style.setProperty('display', 'block');
	};
		
	function updatePlayerInfo(e){
		if(e.target.dataset['id'] === 'aiEasy') {
			hidePlayerBtns();
			showStartBtn();
			GameController.players[1].name = 'Computer';
		} else {
			hidePlayerBtns();
			showStartBtn();
			GameController.players[1].name = 'Player 2';
		}
	};
	
})();

function GameState(starting_player) {
	this.board = new Array(3);
	this.win_state = -1;
	//The winning line/column/diagonal (0-2 - lines, 3-5 - columns, 6-7 - diagonals)
	this.game_over = -1;
	//0 = Draw, 1 = Player 1 Wins, 2 = Player 2 Wins
	this.current_player = starting_player;
	for (var i = 0; i < 3; i++) {
		this.board[i] = new Array(3);
		for (var j = 0; j < 3; j++) {
			this.board[i][j] = 0;
		}
	}
}

GameState.prototype.CopyGameState = function(game_state) {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			this.board[i][j] = game_state.board[i][j];
		}
	}
	this.current_player = game_state.current_player;	
}

GameState.prototype.MakeMove = function(row, column) {
	this.board[row][column] = this.current_player;
}

GameState.prototype.IsGameOver = function() {
	if (this.game_over == -1) {
		for (var i = 0; i < 3; i++) {
			if (this.board[i][0] != 0 && this.board[i][0] == this.board[i][1] && this.board[i][0] == this.board[i][2]) {
				this.game_over = this.current_player;
				this.win_state = i;
				return this.game_over;
			}
		}
		for (var i = 0; i < 3; i++) {
			if (this.board[0][i] != 0 && this.board[0][i] == this.board[1][i] && this.board[0][i] == this.board[2][i]) {
				this.game_over = this.current_player
				this.win_state = i + 3;
				return this.game_over;
			}
		}
		if (this.board[0][0] != 0 && this.board[0][0] == this.board[1][1] && this.board[0][0] == this.board[2][2]) {
			this.game_over = this.current_player
			this.win_state = 6;
			return this.game_over;
		}
		if (this.board[0][2] != 0 && this.board[0][2] == this.board[1][1] && this.board[0][2] == this.board[2][0]) {
			this.game_over = this.current_player
			this.win_state = 7;
			return this.game_over;
		}
		if (!this.HasValidMoves()) {
			this.game_over = 0;
		}
		return this.game_over;
	} else {
		return this.game_over;
	}
}

GameState.prototype.HasValidMoves = function() {
	var valid_moves = false;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (this.board[i][j] == 0) {
				valid_moves = true;
				break;
			}
		}
	}
	return valid_moves;
}

GameState.prototype.GetValidMoves = function() {
	var valid_moves = [];
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (this.board[i][j] == 0) {
				valid_moves.push([i,j]);
			}
		}
	}
	return valid_moves;
}

GameState.prototype.Reset = function(starting_player) {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			this.board[i][j] = 0;
		}
	}
	this.win_state = -1;
	this.game_over = -1;
	this.current_player = starting_player;
}

GameState.prototype.AlternatePlayers = function() {
	if (this.current_player === 1) {
		this.current_player = 2;
	} else {
		this.current_player = 1;
	}
}
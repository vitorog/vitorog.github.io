function AiPlayer(ai_player_id) {
	if (ai_player_id == 2) {
		this.max = 2;
		this.min = 1;
	} else {
		this.max = 1;
		this.min = 2;
	}
	this.best_row = -1;
	this.best_column = -1;	
}

AiPlayer.prototype.MakeMove = function(game_state) {
	alpha = -999;
	beta = 999;
	this.count = 0;
	console.time('MinMax timer');
	this.MinMax(game_state, this.max, 0, alpha, beta);
	console.timeEnd('MinMax timer');
	console.log("Found best move. " + this.count + " nodes searched.");
	return [this.best_row, this.best_column];
}

AiPlayer.prototype.MinMax = function(game_state, player, depth, alpha, beta) {
	this.count++;
	if (game_state.IsGameOver() != -1) {
		return this.Evaluate(game_state, player);
	} else {
		var best_score;
		if(player == this.max){
			best_score = -99;
		}else{
			best_score = 99;
		}		
		var moves = game_state.GetValidMoves();
		for (var k = 0; k < moves.length; k++) {
			var new_game_state = new GameState(game_state.current_player);
			new_game_state.CopyGameState(game_state);
			var row = moves[k][0];
			var column = moves[k][1];
			new_game_state.current_player = player;
			new_game_state.MakeMove(row, column);
			//Max move
			if ( player == this.max) {
				var score = this.MinMax(new_game_state, this.min, depth + 1, alpha, beta);				
				if (score > best_score) {
					if (depth == 0) {
						this.best_row = row;
						this.best_column = column;
					}
					best_score = score;
					alpha = Math.max(alpha,best_score);					
				}				
				if(alpha >= beta){
					return best_score;
				}
			} else { //Min move
				var score = this.MinMax(new_game_state, this.max, depth + 1, alpha, beta);						
				if (score < best_score) {					
					best_score = score;
					beta = Math.min(beta,best_score);
				}	
				if(beta <= alpha){
					return best_score;
				}			
			}			
		}
		return best_score;
	}
}

AiPlayer.prototype.Evaluate = function(game_state, player) {
	var game_over = game_state.IsGameOver();
	if (game_over == 0) {
		return 0;
	} else {
		if (player == this.max) {
			if (game_over == this.max) {
				return 1;
			} else {
				return -1;
			}
		} else if (player == this.min) {
			if (game_over == this.min) {
				return -1;
			} else {
				return 1;
			}
		}
	}
}

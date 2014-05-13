//GLOBAL VARIABLES
var CANVAS;
var CONTEXT;
var GAME_OVER = false;
var CANVAS_X = 0;
var CANVAS_Y = 0;
var BLOCKS_WIDTH = 21;
var BLOCKS_HEIGHT = 21;
var BLOCKS_COUNT_X = 20;
var BLOCKS_COUNT_Y = 11;
var PLAY_AREA_X = CANVAS_X + 10;
var PLAY_AREA_Y = CANVAS_Y + 35;
var PLAY_AREA_WIDTH = BLOCKS_COUNT_X * BLOCKS_WIDTH;
var PLAY_AREA_HEIGHT = BLOCKS_COUNT_Y * BLOCKS_HEIGHT;
var TEXT_AREA_X = CANVAS_X + 10;
var TEXT_AREA_Y = CANVAS_Y + PLAY_AREA_Y - 10;
var SCORE = 0;
var FOOD_EATEN = 0;
var TIME_ELAPSED = 0;
var LAST_ELAPSED = 0;

var CANVAS_WIDTH = PLAY_AREA_WIDTH + 20;
var CANVAS_HEIGHT = PLAY_AREA_HEIGHT + 50;

function SetupGame() {
	CANVAS = document.getElementById("game_canvas");
    CONTEXT = CANVAS.getContext("2d");
    CANVAS.width = CANVAS_WIDTH;
    CANVAS.height = CANVAS_HEIGHT;
    window.addEventListener('keydown',HandleRestart,true);   
};

function Update() {		
	ClearScreen();
	Logic();
	Draw();	
	CalculateElapsedTime();	
};

function CalculateElapsedTime()
{
	var current_elapsed = new Date;
	TIME_ELAPSED = current_elapsed - LAST_ELAPSED;
	LAST_ELAPSED = current_elapsed;	
}


function ClearScreen()
{
	CONTEXT.clearRect (0 , 0, CANVAS.width , CANVAS.height );
	CONTEXT.fillStyle = "#bcdc94";
	CONTEXT.fillRect(0,0, CANVAS.width, CANVAS.height);	
}


function Logic()
{
	if(snake.CheckSelfCollision()){
		GAME_OVER = true;			
	}
	if(!GAME_OVER){
		snake.Move();	
	}
	if(food.eaten || food.total_decay >= food.max_decay){
		GenerateFood();
	}
	if(snake.CheckFoodCollision(food.x,food.y)){
		food.eaten = true;
		snake.AddTailBlock();
		if(food.special === true){
			SCORE += 100;
		}else{
			SCORE += 10;	
		}	
		FOOD_EATEN++;	
	}	
}

function Draw()
{			
	food.Draw();
	snake.Draw();
	DrawBorder();	
	DrawScores();
	if(GAME_OVER){
		DrawGameOverMessage();	
	}		
}

function DrawGameOverMessage()
{
	CONTEXT.fillStyle = "#000000";
	CONTEXT.font = "20px Calibri";
	CONTEXT.fillText("Game Over. Press SPACE to restart.", TEXT_AREA_X + PLAY_AREA_WIDTH/4,TEXT_AREA_Y);	
}

function DrawScores()
{
	CONTEXT.fillStyle = "#000000";
	CONTEXT.font = "20px Calibri";
	CONTEXT.fillText("Score: " + SCORE, TEXT_AREA_X,TEXT_AREA_Y);
}

function DrawBorder()
{
	CONTEXT.strokeStyle = "#000000";
	CONTEXT.strokeRect(PLAY_AREA_X,PLAY_AREA_Y,PLAY_AREA_WIDTH,PLAY_AREA_HEIGHT);
}


function DrawGrid()
{
	var grid_x_size = BLOCKS_WIDTH;
	var grid_y_size = BLOCKS_HEIGHT;
	for(var i = 0; i < BLOCKS_COUNT;i++){
		for(var j = 0; j < BLOCKS_COUNT; j++){
			CONTEXT.strokeStyle = "#FF0000";
			CONTEXT.strokeRect(i*grid_x_size,j*grid_y_size, grid_x_size, grid_y_size);	
		}
	}	
}

function HandleRestart(evt)
{
	switch(evt.keyCode){
		case 32:	
			if(GAME_OVER){	
				Restart()
			}
		break;
	}
}

function Restart()
{
	delete snake;
	snake = new Snake();
	GAME_OVER = false;
	SCORE = 0;
	FOOD_EATEN = 0;
	GenerateFood();
}

function GenerateFood()
{
	
	do{
		food.x = PLAY_AREA_X + Math.floor((BLOCKS_COUNT_X * Math.random())) * BLOCKS_WIDTH;
		food.y = PLAY_AREA_Y + Math.floor((BLOCKS_COUNT_Y * Math.random())) * BLOCKS_HEIGHT;
	}while(snake.CheckFullCollision(food.x,food.y));
	food.eaten = false;
	food.total_decay = 0;
	if(FOOD_EATEN >= 10){
		FOOD_EATEN = 0;
		food.special = true;
	}else{
		food.special = false;
	}
}

function main() {	
    SetupGame();     
    snake = new Snake();
    food = new Food(PLAY_AREA_X, PLAY_AREA_Y);   
    setInterval(Update, 0);   
    LAST_ELAPSED = new Date;
};

main();
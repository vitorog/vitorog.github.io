function Food(x, y)
{
	this.x = x;
	this.y = y;
	this.width = BLOCKS_WIDTH;
	this.height = BLOCKS_WIDTH;
	this.eaten = true;
	this.special = false;
	this.decay_rate = 250; //Decay rate in milliseconds
	this.decay_counter = 0;
	this.total_decay = 0;
	this.max_decay = 250;
}

Food.prototype.Draw = function()
{
	if(this.special){
		if(this.decay_counter > this.decay_rate){
			this.total_decay += 50;
			this.decay_counter = 0;
		}
		var red = 0;
		var green = 255 - (this.total_decay);
		var blue = 0;
		CONTEXT.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
		this.decay_counter += TIME_ELAPSED;
	}else{
		CONTEXT.fillStyle = "#999999";		
	}
	CONTEXT.fillRect(this.x,this.y, this.width, this.height);	
		
	// CONTEXT.strokeStyle = "#BBBBBB";
    // CONTEXT.strokeRect(this.x,this.y,this.width,this.height);        
}
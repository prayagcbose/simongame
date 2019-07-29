var colors= ["green","red","yellow","blue"];
var level=0;
var clickedValArray=[];
var patternArray=[];
var started=false;

$(document).keypress(function(){
	if(started=false){
		level=1;
		$("#level-title").text("level: "+level);
		started=true;
	}
	generatePattern();	
})

$(".btn").click(function(){
	var clickedVal= $(this).attr("id");
	clickedValArray.push(clickedVal);
	displayPattern(clickedVal);
	checkPattern(clickedValArray.length-1);
})

function generatePattern(){
	var randNum=Math.floor(Math.random()*4);
	var randCol=colors[randNum];
	patternArray.push(randCol);
	displayPattern(randCol);

}

function displayPattern(id){
	$("#"+id).addClass("pressed");
	var sound= new Audio("sounds/"+id+".mp3");
	sound.play();
	setTimeout(function(){
		$("#"+id).removeClass("pressed");
	},100);	
}

function checkPattern(chkVal){
	if(clickedValArray[chkVal]==patternArray[chkVal]){
		console.log("success");
		if(clickedValArray.length==patternArray.length){
			level++;
			clickedValArray=[];
			$("#level-title").text("level: "+level);
			setTimeout(function(){
				generatePattern();
			},1000);
				
		}
	}
	else{
		gameOver();
	}		
}

function gameOver(){
	level=0;
	started=false;
	patternArray=[];
	clickedValArray=[];
	$("#level-title").text("game over press ket to restart");
	$("body").addClass("game-over");
	var sound1= new Audio("sounds/wrong.mp3");
	sound1.play();
	setTimeout(function(){
		$("body").removeClass("game-over");
	},1000);
}
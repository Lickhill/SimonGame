var colorarrayplayer = [];
var colorarraycomp = [];
var count = 0;

$(".btn").click(function () {
	var color = $(this).attr("id");
	var audio = new Audio("sounds/" + color + ".mp3");
	audio.play();
	$(this).addClass("pressed");
	setTimeout(() => $(this).removeClass("pressed"), 100);
	colorarrayplayer.push(color);
	for (var i = 0; i < colorarrayplayer.length; i++) {
		if (colorarrayplayer[i] !== colorarraycomp[i]) {
			gameOver();
			return;
		}
	}
	if (colorarrayplayer.length === colorarraycomp.length) {
		setTimeout(correctSequence, 1000);
	}
});

$(document).one("keypress", startGame);

function startGame() {
	count++;
	$("#level-title").text("Level " + count);
	var colorcomp = randomcolor();
	colorarraycomp.push(colorcomp);
	var audio = new Audio("sounds/" + colorcomp + ".mp3");
	audio.play();
	$("#" + colorcomp).addClass("pressed");
	setTimeout(() => $("#" + colorcomp).removeClass("pressed"), 100);
}

function randomcolor() {
	var colors = ["red", "blue", "green", "yellow"];
	return colors[Math.floor(Math.random() * 4)];
}

function correctSequence() {
	colorarrayplayer = [];
	startGame();
}

function gameOver() {
	$("body").addClass("game-over");
	var wrong = new Audio("sounds/wrong.mp3");
	wrong.play();
	$("#level-title").text("Game Over. Press any key to restart.");
	count = 0;
	colorarrayplayer = [];
	colorarraycomp = [];
	$(document).one("keypress", function () {
		$("body").removeClass("game-over");
		startGame();
	});
}

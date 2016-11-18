var squareCount = 4;
var system		= imperial;
var property 	= imperial.length;
var data 		= imperial.length[0];
var uCount		= imperial.length.length;	// Length of length array defined in data.js file
var uCur 		= Math.floor((Math.random() * uCount))
var i, j, k, uPrev, uPrevPrev;

var squares		= $(".square");
var images 		= $(".image");
var overlays 	= $(".overlay");
var infos 		= $(".info");
var captions 	= $(".caption");

init();

function init() {
	newPrompt();
	setupNextBtn();
	setupPBtns();
}

function newPrompt() {
	randPrompt();
	shuffle(data);
	resetData();
	setupData();
	resetEffects();
	setupEffects();
}

// Ensure uCur is neither of previous two units
function randPrompt() {
	uCount = property.length;
	uPrevPrev = uPrev; 
	uPrev = uCur;
	while (uCur == uPrev || uCur == uPrevPrev)
		uCur = Math.floor((Math.random() * uCount));
}

function setupData() {
	// Update units displayed in prompt.
	$("#unit").text(property[uCur].unit);
	$("#article").text(property[uCur].article);

	data = property[uCur].data;
	for (i = 0; i < squareCount; i++) {
		// Setup images and captions for each square.
		$(images[i]).css('background-image', 'url(' + data[i].imgUrl + ')');
		$(captions[i]).text(data[i].caption);
		// Setup correct or incorrect info for each square.
		if (data[i].correct)
			$(overlays[i]).css("background-image", "url(images/misc/checkmark.png)");
		else
			$(infos[i]).html(data[i].info);
	}
}

function resetData() {
	// Reset overlay info so it can be used for next prompt.
	for (i = 0; i < squareCount; i++) {
		$(overlays[i]).css("background-image", "");
		$(infos[i]).html("");
	}
}

// Effects when a square is clicked
function setupEffects() {
	for (i = 0; i < squareCount; i++) {
		if (data[i].correct) {
			$(squares[i]).on("click", function() {
				$(this).children(".image").children(".overlay").css("opacity", "1");
				$(this).removeClass("hover");
				// Display incorrect squares.
				$(this).siblings().children(".image").css("background-color", "rgba(35,35,35,.5)");
				$(this).siblings().children(".image").children(".overlay").css("opacity", "1");
				$(this).siblings().removeClass("hover");
			});
		} else {
			$(squares[i]).on("click", function() {
				$(this).children(".image").css("background-color", "rgba(35,35,35,.5)");
				$(this).children(".image").children(".overlay").css("opacity", "1");
				$(this).removeClass("hover");
			});
		}
	}
}

function resetEffects() {
	for (i = 0; i < squareCount; i++) {
		// Remove dim effect for images and overlays.
		$(images[i]).css("background-color", "rgba(35,35,35,0)");
		$(overlays[i]).css("opacity", "0");
		// Remove chlick listener for all squares.
		$(squares[i]).off("click");
		$(squares[i]).children(".image").off("click");
		$(squares[i]).children(".image").children(".overlay").off("click");
		// Add hover effect for new prompt.
		$(squares[i]).addClass("hover");
	}
}

function setupNextBtn() {
	$("#next").click(function() {
		newPrompt();
	});
}

// function setupSBtn(sBtn, syst) {
// 	$(sBtn).click(function() {
// 		if (uCur == 3) {
// 			system = syst;
// 			$(this).addClass("selected");
// 			$(this).siblings(".system").removeClass("selected");
// 		} else {
// 			system = syst;
// 			property = system[uCur];
// 			uCount = property.length;
// 			$(this).addClass("selected");
// 			$(this).siblings(".system").removeClass("selected");
// 			newPrompt();
// 		}
// 	});
// }

function setupPBtns() {
	$("#length").click(function() {
		property = imperial.length;
		$(this).addClass("selected");
		$(this).siblings(".property").removeClass("selected");
		newPrompt();
	});
	$("#volume").click(function() {
		property = imperial.volume;
		$(this).addClass("selected");
		$(this).siblings(".property").removeClass("selected");
		newPrompt();
	});
	$("#mass").click(function() {
		property = imperial.mass;
		$(this).addClass("selected");
		$(this).siblings(".property").removeClass("selected");
		newPrompt();
	});
}

function shuffle(arr) {
	var j, x, i;
	for (i = arr.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = arr[i - 1];
		arr[i - 1] = arr[j];
		arr[j] = x;
	}
}

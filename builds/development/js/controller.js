var impLength 	= [inch, foot, yard, mile]; 
var impVolume	= [fluidOunce, cup, pint, quart, gallon];
var impMass		= [ounce, pound, ton];
var metLength	= [millimeter, centimeter, meter, kilometer];
var metVolume	= [milliliter, liter, cubicCentimeter, cubicMeter];
var metMass		= [milligram, gram, kilogram];
var time 		= [second, minute, hour, day, year];

var imperial 	= [impLength, impVolume, impMass];
var metric		= [metLength, metVolume, metMass];

var systems		= [imperial, metric];

// Values preloaded to display imperial length prompt.
var numSquare 	= 4;
var system		= imperial;
var pIndex		= 0;
var property 	= system[pIndex];
var numProp		= property.length;
var curPrompt 	= Math.floor((Math.random() * numProp))
var i, j, prevPrompt1, prevPromt2;
var data 		= property[curPrompt].data;

var sButtons	= $("#imperial, #metric");
var pButtons 	= $("#length, #volume, #mass, #time");
var squares		= $(".square");
var images 		= $(".image");
var overlays 	= $(".overlay");
var infos 		= $(".info");
var captions 	= $(".caption");

init();

function init() {
	newPrompt();
	setupNextButton();

	for (i = 0; i < sButtons.length; i++)
		setupSystButton(sButtons[i], systems[i]);

	for (j = 0; j < pButtons.length -1; j++)
		setupPropButton(pButtons[j], j);

	setupPropButton(pButtons[3], 3);
}

function newPrompt() {
	randPrompt();
	shuffle(data);
	resetData();
	setupData();
	resetEffects();
	setupEffects();
}

// Ensure curPrompt is neither of last two questions.
function randPrompt() {
	prevPromt2 = prevPrompt1; 
	prevPrompt1 = curPrompt;
	while (curPrompt == prevPrompt1 || curPrompt == prevPromt2)
		curPrompt = Math.floor((Math.random() * numProp));
}

function setupData() {
	// Update units displayed in prompt.
	$("#unit").text(property[curPrompt].unit);
	$("#article").text(property[curPrompt].article);

	data = property[curPrompt].data;
	for (i = 0; i < numSquare; i++) {
		// Setup images and captions for each square.
		$(images[i]).css('background-image', 'url(' + data[i].imgUrl + ')');
		$(captions[i]).text(data[i].caption);
		// Setup correct or incorrect info for each square.
		if (data[i].correct)
			$(overlays[i]).css("background-image", "url(images/other/checkmark.png)");
		else
			$(infos[i]).html(data[i].info);
	}
}

function resetData() {
	// Reset overlay info so it can be used for next prompt.
	for (i = 0; i < numSquare; i++) {
		$(overlays[i]).css("background-image", "");
		$(infos[i]).html("");
	}
}

// Effects when a square is clicked.
function setupEffects() {
	for (i = 0; i < numSquare; i++) {
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
	for (i = 0; i < numSquare; i++) {
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

function setupNextButton() {
	$("#next").click(function() {
		newPrompt();
	});
}

function setupSystButton(sButton, syst) {
	$(sButton).click(function() {
		if (pIndex == 3) {
			system = syst;
			$(this).addClass("selected");
			$(this).siblings(".system").removeClass("selected");
		} else {
			system = syst;
			property = system[pIndex];
			numProp = property.length;
			$(this).addClass("selected");
			$(this).siblings(".system").removeClass("selected");
			newPrompt();
		}
	});
}

function setupPropButton(pButton, i) {
	$(pButton).click(function() {
		pIndex = i;
		if (pIndex == 3) {
			property = time;
			numProp = property.length;
			$(this).addClass("selected");
			$(this).siblings(".property").removeClass("selected");
			newPrompt();
		} else {
			pIndex = i;
			property = system[pIndex];
			numProp = property.length;
			$(this).addClass("selected");
			$(this).siblings(".property").removeClass("selected");
			newPrompt();
		}
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

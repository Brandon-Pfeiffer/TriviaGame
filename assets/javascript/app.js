

var answerBank = [
	{
	question: "What song is young Elizabeth Swann singing at the start of the movie?",
	answer: "A Pirate's Life for Me",
	option1: "Yo Ho Ho and a Bottle of Rum", 
	option2: "A Pirate Looks at 40",
	correctMessage: "Correct! Foreshadowing eh?",
	wrongMessage: "Wrong! A Pirate's Life for Her!",
	// imageRight:,
	// imageWrong:,
	},

	{
	question: "Barbossa has a pet what?",
	answer: "Monkey",
	option1: "Cat", 
	option2: "Dog",
	correctMessage: "Correct! Jack the monkey!",
	wrongMessage: "Wrong! Barbossa wouldn't have such a lame pet",
	},

	{
	question: "What is the one way the pirates may end the curse?",
	answer: "All of the scattered pieces of Aztec Gold must be restored and the blood repaid.",
	option1: "By findind the key to Davy Jones' locker.", 
	option2: "The son of Bootstrap Bill must be brought to Isla de Muerta",
	correctMessage: "Correct! Soon Barboossa will have his bushel of apples",
	wrongMessage: "Wrong! The blood must be repaid",
	},
];

// ----------- Variables -------------

var seconds; 
var usedNum= [];
var qOrder = [];
var choiceOrder = [];
var count = 0;
var wins = 0;
var losses = 0;
var timeOut = 0;
var timer;
var timesUpID;

// ----------- functions -------------
	
function downTime(){
    // Decrease number by one.
    seconds--;
        
    // Show the number in the #show-number tag.
    $('#timerText').html(seconds);
};

function resetTimer(){
    seconds = 20;
    timer = setInterval(downTime,1000);
};

function stopTimer(){
	clearInterval(timer);
	$('#timerText').empty();
};


function shuffle(max){
	usedNum = [];

	while (usedNum.length < max) {
		var j = Math.floor(Math.random() * max);

		if (!usedNum.includes(j)){
			usedNum.push(j);	
		};
	};
};


function correct(){
	// display correctMessage, correctImage, bannerImg
	$('#answerArea').empty();
	$('#banner').html("<img class='responseImg' src= 'assets/images/yes.png'>");
	$('#qText').html('<h2>' + answerBank[qOrder[count]].correctMessage + '</h2>');
	// $('answerArea').html(answerBank[qOrder[count]].imageRight);
	wins++;
};

function wrong(){
	// display wrongMessage, wrongImage
	$('#answerArea').empty();
	$('#banner').html("<img class='responseImg' src= 'assets/images/no.png'>");
	$('#qText').html('<h2>' + answerBank[qOrder[count]].wrongMessage + '</h2>');
	// $('answerArea').html(answerBank[qOrder[count]].imageWrong);
	losses++;
};




// -------- the Good Stuff ---------

$(document).ready(function() {

	// ------ Inner Vars and Functions -------
	var qAreaClone = $("#qArea").clone(true);
	var answerAreaClone = $('#answerArea').clone(true);


	function qClone(){
		$("#qArea").replaceWith(qAreaClone.clone(true));
	};

	function aClone(){
		$("#answerArea").replaceWith(answerAreaClone.clone(true));
	};

	function fill() {
		if (count > 2){
			setTimeout(end,3500);
		} else {
			$('#timerText').html('10');
			$('#banner').empty();
			$('#qText').html('<h2>' + answerBank[qOrder[count]].question + '</h2>');
			$('#choice'+ choiceOrder[0] + 'Text').html('<h2>' + answerBank[qOrder[count]].answer + '</h2>');
			$('#choice' + choiceOrder[1] + 'Text').html('<h2>' + answerBank[qOrder[count]].option1 + '</h2>');
			$('#choice' + choiceOrder[2] + 'Text').html('<h2>' + answerBank[qOrder[count]].option2 + '</h2>');
			stopTimer();
			resetTimer();
			timesUpID = setTimeout(timesUp, 20 * 1000);
		}
	};

	function timesUp(){
		timeOut++;

		stopTimer();

		if (count > 2){
			setTimeout(end,3500);
		} else {

			$('#answerArea').empty();
			$('#timerText').empty();
			$('#qText').html('<h2>' + answerBank[qOrder[count]].wrongMessage + '</h2>');
			$('#banner').html("<img class='responseImg' src= 'assets/images/no.png'>");
			// $('answerArea').html(answerBank[qOrder[count]].imageWrong);
			console.log("time out " + timeOut);

			setTimeout(aClone,3500);

			setTimeout(fill,3500);

			setTimeout(count++,3500);
			console.log("count " + count);
		}
		
	}

	function end(){
		if (wins + losses + timeOut == 3){
			aClone();
			$('#choice0Text').html('<h2> Right </h2>');
			$('#choice1Text').html('<h2> Wrong </h2>');
			$('#choice2Text').html('<h2> Timed Out </h2>');
			
			$('#button').html("<button id='reset' class='btn btn-success btn-lg btn-block'> Another Round? </button>")
			$('#qText').html("<h2>How'd you do?</h2>");

			$('#choice0Img').html("<img src = 'assets/images/"+ wins +".png'>");
			$('#choice1Img').html("<img src = 'assets/images/"+ losses +".png'>");
			$('#choice2Img').html("<img src = 'assets/images/"+ timeOut +".png'>");
			$('#banner').empty();


			if (wins > (losses+timeOut)){
				$('#banner').html("<img class= 'logo' src ='assets/images/winner.png'>");
			} else {
				
				$('#banner').html("<img class= 'logo' src='assets/images/loser.png'>");
			}
		}
	};

	function resetLeftover(){

		$('#answerArea').empty();
		aClone();


		shuffle(3);
		var temp = usedNum;
		choiceOrder = temp;
		console.log("choice " + choiceOrder)

		shuffle(3);
		var temp2 = usedNum;
		qOrder = temp2;
		console.log("qOrder " + qOrder);

		fill();	

		$('#button').empty();
		console.log("count " + count);
	}		


	function resetVar(){
		seconds; 
		usedNum= [];
		qOrder = [];
		choiceOrder = [];
		count = 0;
		wins = 0;
		losses = 0;
		timeOut = 0;
		timer;
		timesUpID;
		console.log(usedNum);
	}

	//------ the Actual Good Stuff --------
	$('#start').click(function(event){
		
		
		shuffle(3);
		var temp = usedNum;
		choiceOrder = temp;
		console.log("choice " + choiceOrder)

		shuffle(3);
		var temp2 = usedNum;
		qOrder = temp2;
		console.log("qOrder " + qOrder);

		fill();	

		$('#button').empty();
		console.log("count " + count);
	});



	$("#wrapper").on("click", ".choice", function(event){
		
		clearTimeout(timesUpID);

		var temp = $(this).find('h2').html();
		console.log(temp);

		stopTimer();

		if (temp == answerBank[qOrder[count]].answer){
			correct();
			console.log("wins " + wins);
		} else {
			wrong();
			console.log("losses " + losses);
		}

		setTimeout(aClone,3500);

		setTimeout(fill,3500);

		setTimeout(count++,3500);
		console.log("count " + count);

	});

	$("#button").on("click", "#reset", function(event){
		resetVar();
		resetLeftover();
		
	});


});
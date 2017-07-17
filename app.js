var inquirer = require("inquirer");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var fs = require("fs");

inquirer.prompt([{
    name: 'command',
    message: 'What would you like to do?',
    type: 'list',
    choices: [{
        name: 'add-flashcard'
    }, {
        name: 'play-cards'
    }]
}]).then(function(answer) {
    if (answer.command === 'add-flashcard') {
        askCard();
    } else if (answer.command === 'play-cards') {
        showCards();
    }
});

// adds basic or cloze questions function
var askCard = function() {
    inquirer.prompt([{
        name: "type",
        message: "What kind of flashcard would you like to add?",
        type: "list",
        choices: [{
            name: "basicFlashcard"
        }, {
            name: "clozeFlashcard"
        }]
    }]).then(function(answer) {
            if (answer.type === "basicFlashcard") {
                inquirer.prompt([{
                    name: "front",
                    message: "Ask your question.",
                    validate: function(input) {
                        if (input === " ") {
                        	// return false;
                            return console.log("Please ask a question!");

                        } else {
                        	 fs.appendFile("\nlog.txt", answer.front);
                             return true;
                        }
                    }
                }, {
                    name: "back",
                    message: "Type your answer.",
                    validate: function(input) {
                        if (input === " ") {
                            console.log("Please answer the question.");
                            return false;
                        } else {
                        	 fs.appendFile("\nlog.txt", answer.back);
                        	 
                             return true;
                        }
                    }
                }]).then(function(answer) {
                    var newBasicCard = new BasicCard(answer.front, answer.back);
                    newBasicCard.create();
                    continuePlay();

                });
            } else if (answer.type === "clozeFlashcard") {
                inquirer.prompt([{
                        name: 'text',
                        message: "Type the full text.",
                        validate: function(input) {
                            if (input === " ") {
                                console.log("Please type in full text!");
                                return false;
                            } else {
                            	// fs.appendFile("\nlog.txt", answer.text);

                                return true;
                            }
                        }
                    }, {
                        name: "cloze",
                        message: "What is the cloze text?",
                        validate: function(input) {
                            if (input === " ") {
                                console.log("Please type cloze text");
                                return false;
                            } else {
                            	// fs.appendFile("\nlog.txt", answer.cloze);
                                return true;
                            }
                        }
                    }
                ]).then(function(answer) {
                var text = answer.text;
                var cloze = answer.cloze;
                var partial = (answer.text - answer.cloze);
                // if (text.includes(cloze)) {
                     var newClozeCard = new ClozeCard(text, cloze);
                     newClozeCard.create();
                   continuePlay();
                // } else {
                    //  console.log("Please try again! Cloze portion is not found!");
                    // askCard();
                // }
            });
        }
    });
};


var continuePlay = function() {
    inquirer.prompt([{
        name: "nextStep",
        message: "What would you like to do?",
        type: "list",
        choices: [{
            name: "create-new-card"
        }, {
            name: "play-cards"
        }, {
            name: "stop-game"
        }]
    }]).then(function(answer) {
            if (answer.nextStep === "create-new-card") {
                askCard();
            } else if (answer.nextStep === "play-cards") {
                showCards();
            } else if (answer.nextStep === "stop-game") {
                return;
            }

        });
    };

var showCards = function() {
    fs.readFile("./log.txt", "utf8", function(error, data) {
        if (error) {
            console.log("Error occurred: " + error);
        }
        var question = data.split(";");
        var notBlank = function(value) {
            return value;
        };
        question = question.filter(notBlank);
        var count = 0;
        showCardQuestion(question, count);
    });
};

var showCardQuestion = function(array, index) {
    question = array[index];
    var parsedQuestion = JSON.parse(question);
    console.log("parsedQuestion", parsedQuestion);
    var questionText;
    console.log("questionText", questionText);
    var rightAnswer;
    console.log("rightAnswer", rightAnswer);
    if (parsedQuestion.type === "basic") {
        questionText = parsedQuestion.front;
        rightAnswer = parsedQuestion.back;


    } else if (parsedQuestion.type === "cloze") {
	questionText = parsedQuestion.partial;
	rightAnswer = parsedQuestion.cloze;
}
    inquirer.prompt([{
        name: "answer",
        message: questionText,
    }]).then(function(answer) {
        if (answer.response === rightAnswer) {
            console.log("You got it right!");
            // if (index < array.length - 1) {
                // showCardQuestion(array, index + 1);
                showCardQuestion();

            // }
        } else {
            console.log("Nop! The correct answer is: ");
            showCardQuestion();
            // if (index < array.length - 1) {
            //     showCardQuestion(array, index + 1);
            // }
        }
    });
};
var inquirer = require("inquirer");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var fs = require("fs");
// after running node + fileName, asks if I wanna add cards or play cards
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

// adds basic or cloze card questions and answers function, prints them in log.txt
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

                        console.log("Please ask a question!");
                        return false;

                    } else {
                        fs.appendFile("log.txt", answer.front);
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
                        fs.appendFile("log.txt", answer.back);

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

                        return true;
                    }
                }
            }]).then(function(answer) {
                var text = answer.text;
                var cloze = answer.cloze;
                var partial = (answer.text - answer.cloze);
                var newClozeCard = new ClozeCard(text, cloze);
                newClozeCard.create();
                continuePlay();
            });
        }
    });
};

// once cards have been added this function asks if I wanna add a new card, play cards or stop the game
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
// this function reads question from log.txt
var showCards = function() {
    fs.readFile("./log.txt", "utf8", function(error, data) {
        if (error) {
            console.log("Error occurred: " + error);
        }
        var question = data.split(";");
        var count = 0;
        showCardQuestion(question, count);
    });
};
// this function shows the question and checks if the answer is correnct or wrong.
var showCardQuestion = function(array, index) {
    question = array[index];
    var fullCard = JSON.parse(question);
    console.log("fullCard", fullCard);
    var questionText;
    var rightAnswer;
    if (fullCard.type === "basic") {
        questionText = fullCard.front;
        console.log("questionText", questionText);
        rightAnswer = fullCard.back;
        console.log("rightAnswer", rightAnswer);


    } else if (fullCard.type === "cloze") {
        var questionText = fullCard.partial;
        var rightAnswer = fullCard.cloze;
    }
    inquirer.prompt([{
        name: "answer",
        message: questionText,
    }]).then(function(answer) {
        if (answer.answer === rightAnswer) {
            console.log("You got it right!");
            
            // for (var i = 0; i < array.length; i++);
           
                showCardQuestion();

           
        } else {
            console.log("Nop! The correct answer is: " + rightAnswer);
            showCardQuestion();
            
        }
    });
};
var fs = require("fs");
module.exports = ClozeCard;

function ClozeCard (text, cloze) {
	this.text = text;
	this.cloze = cloze;
	this.create = function() {
		var data = {
			text: this.text,
			cloze: this.cloze,
			partial: this.partial,
			type: "cloze"

		};
		fs.appendFile("\nlog.txt", JSON.stringify(data) + ";", + "\n", "utf8", function(error) {
	 		if (error) {
				console.log("Error occurred!", error);
		} else {
			console.log("Cloze card has been added!");
		}
	});
	// this.printCloze = function() {
	// 	console.log(this.cloze);
	// }
	// this.printText = function() {
	// 	console.log(this.text);
	// }
	// this.partial = this.text.replace('(' + this.cloze + ')', '--------------');
	// this.clozeDeleted = text.text.replace(this.cloze, ".....");
	// this.create = function(){
	// 	var data = {
	// 		text: this.text,
	// 		cloze: this.cloze,
	// 		clozeDeleted: this.clozeDeleted,
	// 		type: "cloze"
	// 	};
	// 	fs.appendFile("log.txt", JSON.stringify(data) + ";", "urf8", function(error) {
	// 		if (error) {
	// 			console.log("Error occurred!", error);
	// 		}
	// 	});
	// };
};
}

// ClozeCard.prototype.printAnswer = function() {
// 	console.log(this.text + this.cloze + "Basic card has been added!");
// 	fs.appendFile("log.text", + this.cloze + this.text);
// };


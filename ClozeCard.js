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
		fs.appendFile("log.txt", JSON.stringify(data) + ";", "utf8", function(error) {
	 		if (error) {
				return console.log("Error occurred!", error);
		} else {
			console.log("Cloze card has been added!");
		}
	});
};
}


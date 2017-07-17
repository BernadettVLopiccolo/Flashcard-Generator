var fs = require("fs");
module.exports = BasicCard;
function BasicCard (front, back) {
	this.front = front;
	this.back = back;
	this.create = function() {
		var data = {
			front: this.front,
			back: this.back,
			type: "basic",
		};
		fs.appendFile("\nlog.txt", JSON.stringify(data) + ";" + "\n", "utf8", function(error) {
			if (error) {
				console.log("Error occurred!", error);
			} else {

				console.log("Basic card has been added!");
			}
		});
	};
}


var fs = require("fs")

if(fs.existsSync("./settings.json")) {
	settings = JSON.parse(fs.readFileSync("./settings.json", "utf-8"));
} else {
	throw Error("Theres is no settings file (missing)");
}
module.exports = {
    "settings": JSON.parse(fs.readFileSync("./settings.json", "utf-8"))
};
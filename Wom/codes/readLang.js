var fs = require("fs");

if(fs.existsSync(`./${settings.lang.fileName}`)) {
	lang = JSON.parse(fs.readFileSync(`./${settings.lang.fileName}/${settings.lang.lang}.json`, "utf-8"));
} else {
	console.warn("Theres is no language file(missing)");
	if(fs.existsSync(`./en.json`)) {
		console.info("Language to: English");
	} else {
		throw Error("Theres is no English language file(missing)");
	}
}
module.exports = {
    "lang": lang
};
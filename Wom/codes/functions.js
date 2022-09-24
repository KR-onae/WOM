newLine = `
`

readFile = (url) => {
	var out = {};
	if(existsSync(url)) {
		out.error = false;
		out.text = fs.readFileSync(dir + "./" + settings.page.fileName + "/" +  url);
	} else {
		out.error = true;
	}
	return out;
}

// isJSON
isJSON = (json) => {
	var out = true;
	try {
		JSON.parse(json);
	} catch(error) {
		var out = false;
	}
	if(out == false) {
		try {
			JSON.stringify(json);
		} catch(error) {
			return false;
		}
		if(typeof(JSON) == "string") {
			if((JSON.substr(0,1) == "{" && JSON.substr(JSON.length,1) == "}") || (JSON.substr(0,1) == "[" && JSON.substr(JSON.length,1) == "]")) {
				return true;
			} else {
				return false;
			}
		}
		return true;
	} else {
		return true;
	}
}

// DB
DB = {
	"file": settings.database.fileName
};
DBmkDB = (dbName) => {
	if(fs.existsSync(`./${DB.file}/${dbName}.json`)) {
		return false;
	} else {
		fs.appendFile(`./${DB.file}/${dbName}.json`, "", () => {});
		fs.writeFileSync(`./${DB.file}/${dbName}.json`, "{}", "utf-8");
		return true;
	}
}
DBallDatabases = () => {
	var dbs = [];
	fs.readdirSync(``, );
	fs.readdirSync(`./${DB.file}/`).forEach((file) => {
		if(file.substr(-5) == ".json") {
			dbs.push(file.substr(0,file.length - 5));
		}
	})
	return dbs;
}
DBclearDB = (dbName) => {
	if(fs.existsSync(`./${DB.file}/${dbName}.json`)) {
		fs.writeFileSync(`./${DB.file}/${dbName}.json`, "{}");
	} else {
		throw Error(`DB program: The database is not exist.`);
	}
}
DBgetDB = (dbName) => {
	if(fs.existsSync(`./${DB.file}/${dbName}.json`)) {
		var db = fs.readFileSync(`./${DB.file}/${dbName}.json`);
		if(isJSON(db)) {
			return JSON.parse(db);
		} else {
			throw Error(`DB program: This is not a JSON.`);
		}
	} else {
		throw Error(`DB program: The database is not exist.`);
	}
}
DBsetDB = (dbName, content) => {
	if(fs.existsSync(`./${DB.file}/${dbName}.json`)) {
		if(isJSON(content)) {
			fs.writeFileSync(`./${DB.file}/${dbName}.json`, JSON.stringify(content));
		} else {
			throw Error(`DB program: This is not a JSON.`);
		}
	} else {
		throw Error(`DB program: The database is not exist.`);
	}
}
DBmkCollection = (dbName, collectionName) => {
	if(fs.existsSync(`./${DB.file}/${dbName}.json`)) {
		var db = fs.readFileSync(`./${DB.file}/${dbName}.json`);
		if(isJSON(db)) {
			var db = JSON.parse(db);
			if(db[collectionName] == undefined) {
				db[collectionName] = [];
				fs.writeFileSync(`./${DB.file}/${dbName}.json`, JSON.stringify(db));
			}
			return true;
		} else {
			throw Error(`DB program: This is not a JSON.`);
		}
	} else {
		throw Error(`DB program: The database is not exist.`);
	}
}
DBallCollections = (dbName) => {
	if(fs.existsSync(`./${DB.file}/${dbName}.json`)) {
		var db = fs.readFileSync(`./${DB.file}/${dbName}.json`);
		if(isJSON(db)) {
			return Object.keys(JSON.parse(db));
		} else {
			throw Error(`DB program: This is not a JSON.`);
		}
	} else {
		throw Error(`DB program: The database is not exist.`);
	}
}
DBclearCollection = (dbName, collectionName) => {
	if(fs.existsSync(`./${DB.file}/${dbName}.json`)) {
		var db = fs.readFileSync(`./${DB.file}/${dbName}.json`);
		if(isJSON(db)) {
			var db = JSON.parse(db);
			db[collectionName] = [];
			fs.writeFileSync(`./${DB.file}/${dbName}.json`, JSON.stringify(db));
		} else {
			throw Error(`DB program: This is not a JSON.`);
		}
	} else {
		throw Error(`DB program: The database is not exist.`);
	}
}
DBmkDocument = (dbName, collectionName, content) => {
	if(fs.existsSync(`./${DB.file}/${dbName}.json`)) {
		var db = fs.readFileSync(`./${DB.file}/${dbName}.json`);
		if(isJSON(db)) {
			var db = JSON.parse(db);
			db[collectionName].push(content);
			fs.writeFileSync(`./${DB.file}/${dbName}.json`, JSON.stringify(db));
			return true;
		} else {
			throw Error(`DB program: This is not a JSON.`);
		}
	} else {
		throw Error(`DB program: The database is not exist.`);
	}
	
}
DBfindDocument = (dbName, collectionName, condition) => {
	if(fs.existsSync(`./${DB.file}/${dbName}.json`)) {
		var db = fs.readFileSync(`./${DB.file}/${dbName}.json`);
		if(isJSON(db)) {
			var data = JSON.parse(db)[collectionName];
			var out = [];
			if(condition == [] || condition == {} || condition == "" || condition == undefined) {
				return data;
			} else {
				for(var i = 0; i < data.length; i++) {
					if(data[i] == condition) {
						out.push(data[i]);
					}
				}
				if(typeof(condition) == "object" && JSON.stringify(condition).substr(0,1) == "{") {
					var conditions = Object.keys(condition);
					for(var i = 0; i < data.length; i++) {
						for(var ii = 0; ii < conditions.length; i++) {
							if(data[i] == conditions[i]) {
								out.push(data[i]);
							}
						}
					}
				}
				if(typeof(condition) == "object" && JSON.stringify(condition).substr(0,1) == "[") {
					var conditions = condition;
					for(var i = 0; i < data.length; i++) {
						for(var ii = 0; ii < conditions.length; i++) {
							if(data[i] == conditions[i]) {
								out.push(data[i]);
							}
						}
					}
				}
				return out;
			}
		} else {
			throw Error(`DB program: This is not a JSON.`);
		}
	} else {
		throw Error(`DB program: The database is not exist.`);
	}
	
}

type = (content) => {
	if(typeof(content) == "string") {
		content = content.replaceAll(" ","");
		content = content.replaceAll(newLine,"");
	}
	if(content == "") {
		return "empty";
	}
	if(typeof(content) == "object") {
		var stringify = JSON.stringify(content);
		if(stringify == "[]" || stringify == "{}") {
			return "empty";
		}
		if(stringify.substr(0,1) == "[") {
			return "list";
		} else {
			return "object";
		}
	}
	return typeof(content);
}
anySplit = (text, to) => {
	var out = [];
	if(type(text) == "list") {
		for(var i = 0; i < text.length; i++) {
			if(type(text[i]) == "string") {
				var out = new Function("out",`out.push(${JSON.stringify(text[i].split(to)).substr(1,JSON.stringify(text[i].split(to)).length-2)}); return out`)(out);
			} else {
				out.push(text[i]);
			}
		}
		for(var i = 0; i < out.length; i++) {
			if(type(out[i]) == "string") {
				out[i] = decodeURIComponent(out[i]);
			}
		}
	} else if(type(text) == "string") {
		var out = text.split(to);
	}
	return out;
}
toDict = (any) => {
	var out = {};
	if(type(any) == "list") {
		for(var i = 0; i < Math.floor(any.length / 2) * 2; i = i + 2) {
			out[any[i]] = any[i + 1];
		}
	}
	return out;
}

toBuff = (text) => {
	return Buffer.from(text);
}

isTake = (text) => {
	return text == undefined ? false : true;
}

LangMSG = function(MSG) {
	new Function("settings", "lang", `console.log(\`${MSG}\`)`)(settings, lang);
}

existsSync = (url) => {
	return fs.existsSync(dir + "./" + settings.page.fileName + "/" +  url);
}

module.exports = {
    "LangMSG": LangMSG
};
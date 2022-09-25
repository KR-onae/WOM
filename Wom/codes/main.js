/*┌──────────────────┐*/
/*│ MADE BY NAME0116 │*/
/*│  DO NOT COPY IT  │*/
/*└──────────────────┘*/

const fs = require("fs");
const EFMF = require("./librarys/EFMF");

EFMF.settings.econsole = true;

setTimeout(() => {
	require("./readSettings");
	require("./readLang");

	myip = require("./readIP").myip;

	require("./functions");
	require("./webRoutes");
	require("./readline");

	if(settings.console.log.do && settings.console.log.run) {
		LangMSG(lang.server.starting);
	}

	const webFiles = "./" + settings.page.fileName;

	//(method) EFMF.makeType(any: any, type: any, toString: any, defProto: any, variable: any, func: any): Function
	EFMF.makeType("SERVER", "[SERVER]", "Object", true, function() {})(EFMF.types, {
		"ready": function() {
			app = require("http").createServer((req, res) => {
				app.post = "";
				req.on("data", (data) => {
					app.post = app.post + data;
				})
				req.on("end", () => {
					var url = req.url.split("?")[0].split("#")[0];
					var runurl = "./" + settings.page.fileName + url;
					var postData = toDict(anySplit(anySplit(app.post.replaceAll("+"," "), "&"), "="));
					if(req.url.split("?").length == 1) {
						var getData = {};
					} else {
						var getData = toDict(anySplit(decodeURIComponent(req.url.replaceAll("+"," ")).split("&"), "="));
					}
					var ip = (req.headers["x-forwarded-for"] ||  req.connection.remoteAddress) == "127.0.0.1" ? myip : ip;
					var response = {
						"http": 400,
						"response": undefined
					}
					if(settings.page.lock.indexFile && (url.substr(-11) == "/index.html" || url.substr(-10) == "/index.php" || url.substr(-10) == "/index.jsp" || url.substr(-12) == "/index.html/" || url.substr(-11) == "/index.php/" || url.substr(-11) == "/index.jsp/")) {
						response.http = 404
					} else {
						var routecheck = false
						for(var i = 0; i < routes.length; i++) {
							var route = routes[i].url.substr(0,1) == "/" ? routes[i].url : "/" + routes[i].url
							if(route == req.url.split("?")[0].split("#")[0]) {
								var routecheck = true
								break
							}
						}
						if(routecheck) {
							var routeFunc = routes[i].function({
								"url": req.url,
								"get": getData,
								"post": postData,
								"method": req.method,
								"ip": ip
							}, res)
							var runurl = undefined
							response.http = routeFunc.http == undefined ? 400 : routeFunc.http
							response.response = routeFunc.response
							response.runurl = routeFunc.runurl
							if(Buffer.isBuffer(response.response) == false && isJSON(response.response)) {
								response.response = JSON.stringify(response.response)
							} else {
								response.response = response.response
							}
						} else if(allroute != null) {
							var routeFunc = allroute({
								"url": req.url,
								"get": getData,
								"post": postData,
								"method": req.method,
								"ip": ip
							}, res)
							response.http = routeFunc.http == undefined ? 400 : routeFunc.http
							var runurl = undefined
							if(isJSON(response.response)) {
								response.response = JSON.stringify(response.response)
							} else {
								response.response = response.response
							}
						} else {
							if(!settings.page.AutoRoutes) {
								response.http = 404
								if(settings.page.error.do) {
									response.response = fs.readFileSync(`./${settings.page.error.fileName}/${response.http}.html`)
								} else {
									response.response = undefined
								}
							} else {
								if(fs.existsSync(runurl)) {
									if(runurl.substr(runurl.length-1,1) == "/") {
										if(fs.existsSync(`${runurl}index.html`)) {
											var runurl = `${runurl}index.html`
											var url = `${url}index.html`
										} else if(fs.existsSync(`${runurl}index.php`)) {
											var runurl = `${runurl}index.php`
											var url = `${url}index.php`
										} else if(fs.existsSync(`${runurl}index.jsp`)) {
											var runurl = `${runurl}index.jsp`
											var url = `${url}index.jsp`
										}
									}
								}
								if(fs.existsSync(runurl)) {
									response.response = fs.readFileSync(runurl, "utf-8")
									response.http = 200
								} else {
									response.http = 404
								}
							}
						}
					}
					if(response.http != 200) {
						if(fs.existsSync(`./${settings.page.error.fileName}/${response.http}.html`)) {
							var runurl = `./${settings.page.error.fileName}/${response.http}.html`
							response.response = fs.readFileSync(runurl, "utf-8")
						}
					}
					if(settings.console.log.do && settings.console.log.req) {
						if(settings.console.log.status) {
							console.log(`Status: ${response.http}`)
						}
						if(settings.console.log.URL) {
							console.log(`URL: ${url}`)
						}
						if(settings.console.log.runURL) {
							console.log(`runURL: ${runurl == undefined ? ( response.runurl == undefined ? "&cX&r" : response.runurl ) : runurl}`)
						}
						console.log("")
					}
					res.writeHead(response.http)
					res.end(response.response)
				})
			})
			
			routes.file = fs.readFileSync("./routes.js", "utf-8").toString();
			try {
				eval(routes.file);
			} catch(error) {
				LangMSG(lang.Routes.LoadRoutesErr + error.toString())
			}
		},
		"start": function() {
			app.listen(settings.port, "0.0.0.0", () => {
				if(settings.console.log.do && settings.console.log.run) {
					LangMSG(lang.server.started)
					console.log("")
					if(settings.customFunction != "") {
						if(typeof(settings.customFunction) == typeof([])) {
							for(var i = 0; i < settings.customFunction.length; i++) {
								new Function("settings", "lang", `${settings.customFunction[i]}`)(settings, lang)
							}
						} else {
							new Function("settings", "lang", `${settings.customFunction}`)(settings, lang)
						}
					}
				}
				commandRead();
			})
		
			server.routeCheckIntr = setInterval(() => {
				if(routes.file != fs.readFileSync("./routes.js", "utf-8").toString()) {
					LangMSG(lang.Routes.Reloading);
					routes.file = fs.readFileSync("./routes.js", "utf-8").toString();
					try {
						eval(routes.file);
						server.stop();
						server.ready();
						server.start();
					} catch(error) {
						LangMSG(lang.Routes.ReloadRoutesErr + error.toString() + "\n");
						return;
					}
					LangMSG(lang.Routes.ReloadComplete);
				}
			}, 100)
		},
		"stop": function() {
			app.close();
		}
	});
	server = new SERVER();
	server.ready();
	server.start();
}, 6)
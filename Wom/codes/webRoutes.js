routes = [];
allroute = null;
web = {};
web.route = function (URLorFunc, func) {
	if(type(URLorFunc) == "string") {
		routes.push({
			"url": URLorFunc,
			"function": func
		});
	} else if(type(URLorFunc) == "function") {
		allroute = URLorFunc;
	}
};

module.exports = {
    "routes": routes,
    "allroute": allroute,
    "web": web
};
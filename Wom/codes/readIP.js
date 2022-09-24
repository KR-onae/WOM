var network = require("os").networkInterfaces;

var nets = network();
var myipInfo = Object.create(null);

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        if (net.family === "IPv4" && !net.internal) {
            if (!myipInfo[name]) {
                myipInfo[name] = [];
            }
            myipInfo[name].push(net.address);
        }
    }
}

ip = myipInfo[settings.Internet.loc == false ? Object.keys(myipInfo)[0] : settings.Internet.loc][0];
module.exports = { "ip": ip };
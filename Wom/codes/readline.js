commandRead = function() {
    var ReadLineInterface = require("readline").createInterface({
        "input": process.stdin,
        "output": process.stdout
    });
    ReadLineInterface.question("", function(command) {
        console.log(command);
        console.reload();
        try {
            var EVAL = eval(command);
        } catch (error) {
            console.error(error);
        }
        if(EVAL != undefined) {
            process.stdout.write("&7> ");
            console.log(EVAL);
        }
        setTimeout(function() {
            commandRead();
        }, 10);
        ReadLineInterface.close();
    });
}
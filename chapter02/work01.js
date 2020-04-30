let http = require("http");
let fs = require("fs");

let server = http.createServer();
server.on("request",function(request, response) {
    fs.readFile("work01.html",function(error, data){
        response.setHeader("Content-Type","text/html");
        response.write(data);
        response.end();
    });
});

server.listen(8080);

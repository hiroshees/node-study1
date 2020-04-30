let http = require("http");

let server = http.createServer();
server.on("request",function(request, response) {
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("Hello Node");
    response.end();
});

server.listen(8080);

let http = require("http");
let fs = require("fs");

let server = http.createServer();
server.on("request", doRequest);
server.listen(8080);

function doRequest (request, response) {
    fs.readFile("work03.html", (error, data) => {
        response.setHeader("Content-Type","text/html");
        response.write(data);
        response.end();
    }); 
}

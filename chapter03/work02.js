let http = require("http");
let fs = require("fs");
let url = require("url");
let ejs = require("ejs");

let server = http.createServer();
server.on("request", doRequest);
server.listen(8080);

function doRequest (request, response) {
    let path = url.parse(request.url);
    console.log( path);
    
    let data = {
        title : "九九の表",
    };
    
    ejs.renderFile("./work02.ejs", data, null, function(error, content){
        response.setHeader("Content-Type","text/html");
        response.write(content);
        response.end();
    });
}

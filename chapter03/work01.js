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
        title : "これがタイトル",
        name : "John",
        age : 23,
    };
    
    ejs.renderFile("./work01.ejs", data, null, function(error, content){
        response.setHeader("Content-Type","text/html");
        response.write(content);
        response.end();
    });
}

let http = require("http");
let fs = require("fs");
let url = require("url");
let ejs = require("ejs");

let server = http.createServer();
server.on("request", doRequest);
server.listen(8080);

function doRequest (request, response) {
    let path = url.parse(request.url);
    let params = "";
    let name = "";
    let data = {
        title : "名前一覧",
        name : name,
    };
    
    //console.log(request);
    
    if(request.method == "POST") {
        request.on('data',function(chunk){
            console.log(chunk);
            params += chunk;
        });
        request.on('end', function() {
            console.log(params);
            params = params.split("=");
            if(params[0] && params[0] == "name") {
                name = params[1];
                data = {
                    title : "名前一覧",
                    name : name,
                };
                ejs.renderFile("./work05.ejs", data, null, function(error, content){
                    response.setHeader("Content-Type","text/html");
                    response.write(content);
                    response.end();
                });
            }
        });
    } else {
        ejs.renderFile("./work05.ejs", data, null, function(error, content){
            response.setHeader("Content-Type","text/html");
            response.write(content);
            response.end();
        });
    }
}

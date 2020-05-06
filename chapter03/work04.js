let http = require("http");
let fs = require("fs");
let url = require("url");
let ejs = require("ejs");

let server = http.createServer();
server.on("request", doRequest);
server.listen(8080);

function doRequest (request, response) {
    let path = url.parse(request.url);
    
    console.log(path);
    
    console.log(request.method);
    let search = "";
    
    if(request.method == "GET") {
        let params = path.query.split("=");
        console.log(params);
        if(params[0] && params[0] == "search") {
            search = params[1];
        }
    }
    console.log(search);
    
    let data = {
        title : "検索",
        search : search,
    };
    
    ejs.renderFile("./work04.ejs", data, null, function(error, content){
        response.setHeader("Content-Type","text/html");
        response.write(content);
        response.end();
    });
}

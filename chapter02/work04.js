let http = require("http");
let fs = require("fs");
let url = require("url");

let server = http.createServer();
server.on("request", doRequest);
server.listen(8080);

function doRequest (request, response) {
    let path = url.parse(request.url);
    console.log( path);
    let filename = "";
    
    switch( path.pathname ) {
        case "/" :
            filename = "index.html";
            break;
        case "/page1.html" :
            filename = "page1.html";
            break;
        case "/page2.html" :
            filename = "page2.html";
            break;
        default :
            filename = "index.html";
            break;
    }
    
    fs.readFile(filename, (error, data) => {
        response.setHeader("Content-Type","text/html");
        response.write(data);
        response.end();
    }); 
}

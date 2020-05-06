let http = require("http");
let fs = require("fs");
let url = require("url");
let ejs = require("ejs");

let server = http.createServer();
server.on("request", doRequest);
server.listen(8080);

// data
let employees = [
    { name : "Micky", age : 23, dept : "sales" },
    { name : "Minny", age : 21, dept : "pr" },
    { name : "Donald", age : 22, dept : "dev" },
];

function doRequest (request, response) {
    let path = url.parse(request.url);
    
    let data = {
        title : "社員一覧",
        employees : employees,
    };
    
    ejs.renderFile("./work03.ejs", data, null, function(error, content){
        response.setHeader("Content-Type","text/html");
        response.write(content);
        response.end();
    });
}

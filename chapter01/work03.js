let http = require("http");

let server = http.createServer(function(request, response) {
    response.setHeader("Content-Type","text/html");
    response.write("<html>");
    response.write("<body>");
    response.write("<h1>This is work03</h1>");
    response.write("</body>");
    response.write("</html>");
    response.write("<html>");
    response.end();
});

server.listen(8080);

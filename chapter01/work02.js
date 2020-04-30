let http = require("http");

let server = http.createServer();
server.on("request",function(request, response) {
    response.setHeader("Content-Type","text/html");
    response.write("<html>");
    response.write("<body>");
    response.write("<h1>Hello Node JS</h1>");
    response.write("</body>");
    response.write("</html>");
    response.write("<html>");
    response.end();
});

server.listen(8080);

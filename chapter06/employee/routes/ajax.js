var express = require('express');
var router = express.Router();

// work01
router.get("/work01",(request, response) => {
    let message = "";
    if(request.session.message) {
        message = request.session.message;
    }
    response.render("work01",{
        title : "work01",
        message : message,
    });
});

// work02
router.get("/work02",(request, response) => {
    response.render("work02",{
        title : "work02",
    });
});


let employees = [
    {id : 1, name : "John", age : 17, dept : "Vocal & Guitar"},
    {id : 2, name : "Paul", age : 17, dept : "Base"},
    {id : 3, name : "George", age : 16, dept : "Guitar"},
    {id : 4, name : "Ringo", age : 18, dept : "Drums"},
];
// work03
router.get("/work03", (request, response) => {
    let result = {
        message : "success",
    };
    result["e"] = employees.find(e => e.id == request.query.number);
    if(!result["e"]) {
        result.e = {};
        result.message = "not found";
    }
    response.json(result);
});

module.exports = router;

var express = require('express');
var router = express.Router();


let employees = [
    { id : 1, name : "Micky", age :21, dept : "sales"},
    { id : 2, name : "Minny", age :20, dept : "human resource"},
    { id : 3, name : "Donald", age :22, dept : "develop"},
];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send(employees);
});

router.get('/list',(req,res,next) => {
    res.json(employees);
});

module.exports = router;

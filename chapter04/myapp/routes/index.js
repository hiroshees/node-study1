var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let employees = [
    { id : 1, name : "Micky", age :21, dept : "sales"},
    { id : 2, name : "Minny", age :20, dept : "human resource"},
    { id : 3, name : "Donald", age :22, dept : "develop"},
];

router.get('/list',(req,res,next) => {
    res.render('list', {
        title : '一覧',
        employees : employees,
    });
});

router.get('/new',(req,res,next) => {
    res.render('new',{
        title : '新規作成',
    });
});

router.post('/new',(req,res,next) => {
    console.log(req.body);
    employees.push({
        name : req.body.name,
        age : req.body.age,
        dept : req.body.dept,
    });
    res.redirect(302, "/list");
});

router.get('/edit',(req, res, next) => {
    console.log(req.query.id);
    if(! req.query.id ) {
        res.redirect(302, "/list");
    }
    let employee = employees.find(function(e) {
        return e.id == req.query.id;
    });
    res.render('edit', {
        title : "編集",
        employee : employee,
    });
});

router.post('/edit', (req,res,next) => {
    let id = req.body.id;
    
    let employee = employees.find(e => e.id == id);
    employee.name = req.body.name;
    employee.age = req.body.age;
    employee.dept = req.body.dept;
    
    res.redirect(302, '/list');
});

module.exports = router;

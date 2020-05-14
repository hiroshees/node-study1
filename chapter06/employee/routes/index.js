var express = require('express');
var router = express.Router();
let utils = require("../modules/utils.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    // schema
    let Employees = module.parent.exports.set('Employees');
    
    // get from session
    console.log(req.session);
    let message = "";
    if(req.session.message) {
        message = req.session.message;
    }
    Employees.find(function(error, data){
        if( error ) {
            console.log( error);
        }
        
        res.render('index',{
            title : "一覧",
            data: data,
            message : message,
            utils : utils,
        });
    });
});


router.post("/", (request, response) => {
    let message = request.body.message;
    request.session.message = message;
    response.redirect("/");
});

// new
router.get('/new', (request,response) => {
    response.render('new',{
        title : "新規作成",
    });
});

// new post
router.post('/new', (request, response) => {
    // get Schema
    let Employees = module.parent.exports.set('Employees');
    
    let e = new Employees({
        name : request.body.name,
        age : request.body.age,
        dept: request.body.dept,
    });
    
    e.save(function(error){
        if(error) console.log(error);
    	response.redirect("/");
    });
});

// delete
router.get("/delete/:id", (request, response) => {
    // get Schema
    let Employees = module.parent.exports.set('Employees');
    
    // id
    let id = request.params.id;

    // delete
    Employees.remove({_id : id},function(error){
        if(error) throw error;
        response.redirect("/");
    });
});

// edit get
router.get("/edit/:id",(request, response) => {
    // get Schema
    let Employees = module.parent.exports.set('Employees');
    
    // id
    let id = request.params.id;
    
    Employees.findOne({_id : id},(error, data) => {
        console.log(data);
        if(error) throw error;
        response.render("edit",{
            title : "編集",
            data: data,
            utils : utils,
        });
    });
});

// edit post
router.post("/edit", (request, response) => {
    // get Schema
    let Employees = module.parent.exports.set('Employees');
    
    let id = request.body.id;
    
    Employees.update(
        {_id: id},
        {
            $set : {
                name : request.body.name,
                age : request.body.age,
                dept : request.body.dept,
                updated: Date.now(),
            }
        },function(error){
            response.redirect("/");
    });
});

module.exports = router;

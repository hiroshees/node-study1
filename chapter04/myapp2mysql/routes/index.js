var express = require('express');
var router = express.Router();

// list
router.get('/', (request, response) => {
    let con = module.parent.exports.set('connection');
	const sql = "select * from employees";
	con.query(sql, function (err, result, fields) {
    	if (err) throw err;
    	response.render('index',{
    	    title : "一覧",
    	    employees : result,
    	});
    });
});

// new
router.get('/new', (request,response) => {
    response.render('new',{
        title : "新規作成",
    });
});

// new post
router.post('/new', (request, response) => {
    // get POST params
    let data = [request.body.name, request.body.age, request.body.dept];
    
    let con = module.parent.exports.set('connection');
    const sql = 'INSERT INTO employees ( name, age, dept) values ( ?, ?, ?)';
	con.query(sql, data, function (err, result, fields) {
    	if (err) throw err;
    	response.redirect("/");
    });
});

// edit get
router.get('/edit',(request, response) =>{
    // get param
    let id = request.query.id;
    
    let con = module.parent.exports.set('connection');
	const sql = "select * from employees where id = ?";
	con.query(sql, [id], function (err, result, fields) {
	    console.log(result);
    	if (err) throw err;
    	response.render('edit',{
    	    title : "編集",
    	    employee : result[0],
    	});
    });
});

// edit post
router.post('/edit', (request, response) => {
    // get POST params
    let data = [request.body.name, request.body.age, request.body.dept, request.body.id];
    
    let con = module.parent.exports.set('connection');
    const sql = 'UPDATE employees set name = ?, age = ?, dept = ? where id = ?';
	con.query(sql, data, function (err, result, fields) {
    	if (err) throw err;
    	response.redirect("/");
    });
});

module.exports = router;

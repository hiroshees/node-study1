var express = require('express');
var router = express.Router();

// list
router.get('/', function(req, res, next) {
    let MyData = module.parent.exports.set('MyData');
    MyData.find(function(error, data){
        if( error ) {
            console.log( error);
        }
        res.render('index',{
            title : "一覧",
            data: data,
            q : "",
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
    // get Schema
    let MyData = module.parent.exports.set('MyData');
    let m1 = new MyData({
        name : request.body.name,
        age : request.body.age,
        memo : request.body.memo
    });
    
    m1.save(function(error){
        if(error) console.log(error);
    	response.redirect("/");
    });
});

// edit get
router.get('/edit',(request, response) =>{
    // get schema
    let MyData = module.parent.exports.set('MyData');
    // get param
    let id = request.query.id;
    
    MyData.findOne({_id : id},function(error, data){
    	response.render('edit',{
    	    title : "編集",
    	    data : data,
    	});
    });
});

// edit post
router.post('/edit', (request, response) => {
    // get schema
    let MyData = module.parent.exports.set('MyData');

    let id = request.body.id;
    
    MyData.update(
        {_id: id},
        {
            $set : {
                name : request.body.name,
                age : request.body.age,
                memo : request.body.memo,
            }
        },function(error){
            response.redirect("/");
    });
});


// delete get
router.get('/delete/:id', (request, response) => {
    // get schema
    let MyData = module.parent.exports.set('MyData');
    // get param
    let id = request.params.id;
    
    // delete
    MyData.remove({_id : id},function(error){
        if(error) throw error;
        response.redirect("/");
    });
});

// list
router.get('/search', function(req, res, next) {
    let MyData = module.parent.exports.set('MyData');
    
    let q = req.query.q;
    
    // name = q
    /*
    MyData
        .find({"name" : q})
        .exec(callback);
    */
    
    // age <= q
    /*
    MyData
        .find({age: {$lte : q}})
        .exec(callback);
    */
    
    // use where name = q
    // MyData.where({name : q}).exec(callback);
    
    // use where id = q
    //MyData.where({_id : q}).exec(callback);
    
    // where age <= q order by desc
    MyData.where('age').lte(q).sort('-age').exec(callback);
        
    function callback(error, data) {
        if( error ) {
            console.log( error);
        }
        res.render('search',{
            title : "検索結果",
            data: data,
            q : q,
        });        
    }
    /*
    MyData.find(function(error, data){
        if( error ) {
            console.log( error);
        }
        res.render('search',{
            title : "検索結果",
            data: data,
            q : q,
        });
    });
    */
});


module.exports = router;

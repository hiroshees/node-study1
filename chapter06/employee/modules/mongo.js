// use mongodb with mongoose
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/employee', {
  useNewUrlParser: true, 
  useUnifiedTopology : true
});

// create schema
var EmployeesSchema = new mongoose.Schema({
  "name" : String,
  "age" : Number,
  "dept" : String,
  "created" :  { type : Date, default: Date.now },
  "updated" :  { type : Date, default: Date.now }
},{ collection: "emoloyees"});

// set schema
var Employees = mongoose.model('employees', EmployeesSchema);

// export
module.exports = {Employees, db};

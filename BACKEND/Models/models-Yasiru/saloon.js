const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saloonSchema = new Schema({
    Employee_ID:{
        type:String,
        required:true
    },
    
    Name:{
        type:String,
        required:true
    },

    Address:{
        type:String,
        required:true
    },

    Age:{
        type:Number,
        required:true
    },

    Salary:{
        type:Number,
        required:true
    }

})

const Employee = mongoose.model("Employee",saloonSchema);
module.exports=Employee;

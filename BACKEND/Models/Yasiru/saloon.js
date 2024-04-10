const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saloonSchema = new Schema({
    Employee_ID:{
        type:String,
        required:true,
        unique: true
    },
    
    Name:{
        type:String,
        required:true
    },

    Address:{
        type:String,
        required:true
    },

    jobRole:{
        type:String,
        required:true
    },

    Salary:{
        type:Number,
        required:true
    },

    /*Attendance:{
        type:Number,
        required:true
    }*/
    

})

const Employee = mongoose.model("Employee",saloonSchema);//Database name
module.exports=Employee;

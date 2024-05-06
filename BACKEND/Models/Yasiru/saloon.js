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

    Category: {
        type: String,
        required: true
    },

    jobRole:{
        type:String,
        required:true
    },

    Salary:{
        type:Number,
        required:true
    },

    
    Password:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    Image:{
        type:String
    }

})

const Employee = mongoose.model("Employee",saloonSchema);//Database name
module.exports=Employee;

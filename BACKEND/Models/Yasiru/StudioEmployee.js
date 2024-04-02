const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studioSchema = new Schema({
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

    Qualification:{
        type:String,
        required:true
    },

    Salary:{
        type:Number,
        required:true
    }

})

const Employee = mongoose.model("StudioEmployee",studioSchema);//Database name
module.exports=Employee;
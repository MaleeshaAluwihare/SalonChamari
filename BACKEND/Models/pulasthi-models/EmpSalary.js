const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpSalarySchema = new Schema({
    empId: {
        type: String,  
        required: true,
        unique:true,
        trim: true
    },
    attendance: {
        type: Number,   
        required: true,
        trim: true  
    },
    date: {
        type: Date,   
        required: true  
    },
    jobRole: {
        type: String,  
        required: true,
        trim: true
    },
    salary: {
        type:Number
    }
},{timestamps:true})

const EmpSalaryTable = mongoose.model("EmpSalarie", EmpSalarySchema);

module.exports = EmpSalaryTable;

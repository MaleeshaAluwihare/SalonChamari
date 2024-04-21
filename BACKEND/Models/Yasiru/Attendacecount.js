const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    empId:{
        type:String,
        required:true,
       
    },
    
    attendance:{
        type:Number,
        required:true
    }, 

    jobRole:{
        type:String,
        required:true
    },

  
})

const Attendance = mongoose.model("Attendance",AttendanceSchema);//Database name
module.exports=Attendance;

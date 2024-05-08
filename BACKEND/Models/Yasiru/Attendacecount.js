const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    empId:{
        type:String,
        required:true,
       
    },
    
    attendance:{
        type:Boolean,
        required:true
    }, 

    jobRole:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        default: () => {
            let date = new Date();
            date.setHours(0,0,0,0);
            return date;
        }
    }
});

// Add a compound index on empId and date
AttendanceSchema.index({ empId: 1, date: 1 }, { unique: true });

//TTL index to expire documents after 30 days
AttendanceSchema.index({ date: 1 }, { expireAfterSeconds: 2592000 });


const Attendance = mongoose.model("Attendance",AttendanceSchema);
module.exports=Attendance;
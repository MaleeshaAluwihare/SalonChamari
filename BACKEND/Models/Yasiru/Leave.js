const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
    Employee_ID:{
        type:String,
        required:true,
    },
    
    date:{
        type:Date,
        default: () => {
            let date = new Date();
            date.setHours(0,0,0,0);
            return date;
        }
    },
    

    type:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    

   
})
// Add a compound index on empId and date
LeaveSchema.index({ Employee_ID: 1, date: 1 }, { unique: true });

const Leave = mongoose.model("Leave",LeaveSchema);//Database name
module.exports=Leave;

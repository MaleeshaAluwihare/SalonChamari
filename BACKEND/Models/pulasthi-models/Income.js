const mongoose = require('mongoose')

const IncomeSchema = new mongoose.Schema({

    bookingId:{
        type:String,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        required:true,
    }
},{timestamps:true})


//table name is given from below code but when table name get created in mongoDB it rename the Firstletter as simple and add 's' as last letter.
const IncomeTable=mongoose.model("Income",IncomeSchema);
//use this IncomeTable constant name when you save(),find()
module.exports = IncomeTable;
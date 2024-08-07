const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({

    expenseId:{
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
        required:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },

    },{timestamps:true})

//TTL index to expire documents after a month(find only the expense for the month)
ExpenseSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });
//table name is given from below code but when table name get created in mongoDB it rename the Firstletter as simple and add 's' as last letter.
const ExpenseTable=mongoose.model("Expense",ExpenseSchema);
//use this IncomeTable constant name when you save(),find()
module.exports = ExpenseTable;
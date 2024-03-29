const mongoose = require('mongoose');  // Importing mongoose for MongoDB object modeling
const Schema = mongoose.Schema;  // Destructuring Schema class from mongoose

// Define the schema 
const budgetSchema = new Schema({
    budgetId: {
        type: String,  
        required: true,
        unique:true,
        trim: true
    },
    month: {
        type: String,   
        required: true,
        trim: true  
    },
    amount: {
        type: Number,  
        required: true,
        trim: true
    },
    date: {
        type: Date,   
        required: true  
    },
    }, { timestamps: true }); 

// Create a model named "Budget" using the studentSchema
const BudgetTable = mongoose.model("Budget", budgetSchema);
// Export the BudgetTable model to be used elsewhere in the application
module.exports = BudgetTable;
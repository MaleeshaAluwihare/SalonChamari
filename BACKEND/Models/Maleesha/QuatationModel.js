const mongoose = require('mongoose');


const QuotationSchema = new mongoose.Schema({
    
    appointmentID: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    quotation: {
        type: String
    },
    currentDate: {
        type: Date,
        default: Date.now
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    }
});

const Quotation = mongoose.model('QuotationAppointment', QuotationSchema);

module.exports = Quotation;

const mongoose = require('mongoose');
const loanSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: true
    },
    nextOfKin: {
        type: String,
        required: true
    },
    guarantor: {
        type: String,
        required: true
    },
    loanNo: {
        type: String,
        unique: true,
        required: true
    }
},
{
    versionKey: false,
    timestamps: true
})
module.exports = mongoose.model('Loan', loanSchema);
// models/financialEntryModel.js
const mongoose = require('mongoose');

const financialEntrySchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'financial_entries'
});

const FinancialEntry = mongoose.model('FinancialEntry', financialEntrySchema);

module.exports = FinancialEntry;

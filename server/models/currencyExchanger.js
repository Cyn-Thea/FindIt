var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exchangeRateSchema = new Schema({
    from: {
        type: String,
        required: true,
        max: 3
    },
    to: {
        type: String,
        required: false,
        max: 3
    },
    rate: {
        type: Number
    },
    amountInUSD: {
        type: Number
    },
    date: {
        type: Date
    }
    
});

module.exports = mongoose.model('exchangeRates', exchangeRateSchema);
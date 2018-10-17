const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MemberSchema = new Schema({
    name: String,
    phone: String,
    address: String,
    date: String,
})

module.exports = mongoose.model('Applicant', MemberSchema);

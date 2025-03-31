const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String, require: true
    },
    email_address: {
        type: String, require: true
    },
    phone_number: {
        type: Number, require: true
    },
    position: {
        type: String, require: true
    },
    experience: {
        type: String, require: true
    }
    ,
    resume: {
        type: String, require: true
    },
    status: {
        type: String, require: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId }
})

const Employee = new mongoose.model("Employee", EmployeeSchema)
module.exports = Employee
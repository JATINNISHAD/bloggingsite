const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:[true,'please provide your name']
    },
    email: {
        type:String,
        required:[true,'please provide your email'],
        unique:true
    },
    password: {
        type:String,
        required:[true,'please provide password']
    }
})
UserSchema.pre('save',function(next){
    const user = this
    bcrypt.hash(user.password,10,function(error,encrypted){
        user.password = encrypted
        next()
    })
})
module.exports = mongoose.model('User',UserSchema)
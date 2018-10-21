const bcrypt = require('bcrypt')
const User = require('../database/models/User')
module.exports = (request ,response)=>{
    const {email,password} = request.body
    //try to find the user
    User.findOne({email},(error,user)=>{
        if(user){
            //compare passwords
            bcrypt.compare(password,user.password,(error,same)=>{
                if(same){
                    //store user session
                    request.session.userId = user._id
                    response.redirect('/')
                }else{
                    response.redirect('/auth/login')
                }
            })
        }else{
            return response.redirect('/auth/login')
        }
    })
}
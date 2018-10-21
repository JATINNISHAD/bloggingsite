module.exports = (request,response)=>{
    console.log(request.session.registrationErrors)
    response.render('register',{
        errors:request.flash('registrationErrors'),
        data:request.flash('data')[0]
    })
}
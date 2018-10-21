module.exports = (request,response)=>{
    if(request.session.userId){
        return response.render('create')
    }
    response.redirect('/auth/login')
};
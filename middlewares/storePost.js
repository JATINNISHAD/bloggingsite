module.exports = (request,response,next)=>{
    if(!request.files.image || !request.body.username || !request.body.title || !request.body.description || !request.body.content){
        return response.redirect('/posts/new')
    }


    next()
}
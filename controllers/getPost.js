const Post = require('../database/models/post')
module.exports = async(request,response)=>{
    const post = await Post.findById(request.params.id)
    response.render('post',{
        post
    })
}
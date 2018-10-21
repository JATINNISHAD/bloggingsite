const Post = require('../database/models/post')
const path = require('path')
module.exports = (request,response)=>{
    const { image } = request.files
    
    image.mv(path.resolve(__dirname,'..','public/posts',image.name),(error)=>{
        Post.create({
            ...request.body,
            image: `/posts/${image.name}`
        },(error,post)=>{
            response.redirect('/')
        })
    })
}
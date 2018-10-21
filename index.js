const express = require('express')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const edge = require('edge.js')

const fileUpload = require('express-fileupload')



const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

const app = express()
mongoose.connect('mongodb://localhost/node-js-blog')
const mongoStore = connectMongo(expressSession)

app.use(connectFlash())
app.use(expressSession({
    secret:'secret',
    store:new mongoStore({
        mongooseConnection:mongoose.connection
    })
}))


app.use(fileUpload())
app.use(expressEdge)
app.use(express.static('public'))
app.set('views',`${__dirname}/views`)
app.use('*',(request,response,next)=>{
    edge.global('auth',request.session.userId)
    next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(expressSession({
    secret:'secret'
}))

const storePost = require('./middlewares/storePost')
const auth = require('./middlewares/auth')
const redirectIfAuthenticated = require('./middlewares/redirectIfAuthenticated')



app.get('/',homePageController)
app.get('/post/:id',getPostController)
app.get('/posts/new',auth,createPostController)
app.post('/posts/store',auth,storePost,storePostController)
app.get('/auth/login', redirectIfAuthenticated , loginController)
app.post('/users/login', redirectIfAuthenticated , loginUserController)
app.get('/auth/register', redirectIfAuthenticated , createUserController)
app.post('/users/register', redirectIfAuthenticated , storeUserController)
app.get('/auth/logout',logoutController)



    
app.listen((4000),()=>{
    console.log('the app is listening on port 4000')
})
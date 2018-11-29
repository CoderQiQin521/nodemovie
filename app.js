const express     = require('express')
const app         = express()
var   mongoose    = require('mongoose')
const _           = require('underscore')
const bodyParser  = require('body-parser')
const indexRouter = require('./router')
var port = process.env.PORT || 3000

// 连接数据库
mongoose.connect('mongodb://localhost/imm')
// express本地变量
app.locals.moment = require('moment')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
// app.use()

app.set('view engine', 'pug')// 设置模版引擎
app.set('views', './view/pages')// 设置模版路径
// app.enable('view cache')//开启模板缓存

var server = app.listen(port, '192.168.101.22', function () {
    var host = server.address().address
    var port = server.address().port
    console.log('node服务已启动, http://%s:%s', host, port);
})

// 模块化挂载路由
indexRouter(app)

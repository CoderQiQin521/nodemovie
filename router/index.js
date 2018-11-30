const Movie = require('../models/movie')
const User = require('../models/user')

module.exports = function (app) {
  // 前台路由
  app.get('/', function (req, res) {
    Movie.fetch(function (err, movies) {
      if (err) {
        console.error(err);
      }
      res.render('index', {
        movies: movies
      })
    })
  })

  app.get('/movie/:id', function (req, res) {
    var id = req.params.id
    Movie.findById(id, (err, movie) => {
      res.render('movie', {
        movie: movie
      })
    })
  })

  // 后台路由
  app.get('/admin', (req, res) => {
    console.log('后台首页');
    Movie.fetch((err, movies) => {
      res.render('adminindex', {
        movies: movies
      })
    })
  })

  // add movie
  app.get('/admin/movie/new', (req, res) => {
    var id = req.query.id
    console.log(id);
    if (id) {
      Movie.findById(id, (err, movie) => {
        res.render('adminadd', {
          movie: movie
        })
      })
    } else {
      res.render('adminadd', {
        movie: {
          title: "",
          doctor: "",
          country: "",
          year: "",
          poster: "",
          flash: "",
          summary: "",
          language: ""
        }
      })
    }
  })

  // add or update a movie
  app.post('/admin/movie/new', (req, res) => {
    var id = req.body.movie._id
    var movieObj = req.body.movie

    // 更新
    var _movie = null
    if (id !== '') {
      Movie.findById(id, (err, movie) => {
        if (err) {
          console.error(err);
        }
        _movie = _.extend(movie, movieObj)
        _movie.save(function (err, movie) {
          if (err) {
            console.error(err);
          }
          res.redirect('/movie/' + movie._id)
        })
      })
    } else {
      _movie = new Movie({
        doctor: movieObj.doctor,
        title: movieObj.title,
        country: movieObj.country,
        language: movieObj.language,
        year: movieObj.year,
        poster: movieObj.poster,
        summary: movieObj.summary,
        flash: movieObj.flash
      })
      _movie.save(function (err, movie) {
        if (err) {
          console.error(err);
        }
        res.redirect('/movie/' + movie._id)
      })
    }
  })

  // del a movie
  app.delete('/admin/del', (req, res) => {
    var id = req.query.id
    console.log(id);
    if (id) {
      Movie.remove({ _id: id }, (err, movie) => {
        if (err) {
          console.error(err);
        } else {
          res.json({ success: 1 })
        }
      })
    }
  })

  // 用户路由
  app.post('/user/register', (req, res) => {
    let _userdata = req.body.user

    var _user = new User({
      username: _userdata.username,
      password: _userdata.password
    })

    User.find({ username: _userdata.username }, (err, user) => {
      if (err) {
        console.error(err);
      }

      if (user.length) {
        console.log('已注册');
        res.send({
          errno: 1,
          msg: '该用户名已被注册'
        })

      } else {
        _user.save((err, user) => {
          if (err) {
            console.error(err);
          }

          res.send({
            errno: 0,
            msg: '注册成功'
          })
          console.log('注册成功', user);

        })
      }
    })

    console.log('用户名: %s  密码: %s', _userdata.username, _userdata.password);
  })

  // 登录
  app.post('/user/login', (req, res) => {
    var _user = req.body.user
    var name = _user.username
    var password = _user.password

    User.find({ username: name }, (err, user) => {
      if (err) {
        console.error(err);
      }

      console.log(user);

      if (!user.length) {
        console.log('用户不存在');
        res.send({
          errno: 1,
          msg: '用户不存在'
        })
      } else {
        // 那到前台提交密码,进行加密比对
        // User.bd()
      }
    })
  })

  app.get('/user/list', (req, res) => {
    User.fetch((err, users) => {
      if (err) {
        console.error(err)
      }

      res.render('userlist', {
        title: '用户列表',
        users: users
      })
    })
  })

  app.delete('/user/del', (req, res) => {
    var id = req.query.id
    console.log(id);
    
    User.findById(id, (err, user) => {
      if (err) {
        console.error(err);
      }

      if (user) {
        User.remove({ _id: id }, (err, user) => {
          if (err) {
            console.error(err);
          } else {
            res.json({
              errno: 0,
              msg: '删除成功'
            })
          }
        })
      }
    })
  })
}
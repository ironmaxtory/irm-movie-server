var express = require('express');
var router = express.Router();

var Movie = require('../models/movie.js');

var movieItem = {
  _id: 1,
  meta: {
    createTime: 1518182010816,
    updateTime: 1518182010816
  },
  title: '复仇者联盟3：无限战争',
  poster: 'https://img3.doubanio.com/view/photo/l/public/p2506296392.webp',
  director: '安东尼·罗素 / 乔·罗素',
  country: '美国',
  year: '2018(中国大陆) / 2018-05-04(美国)',
  language: '英语',
  flash: 'http://vt1.doubanio.com/201802091636/942d14067cab784178b41b4d28acd820/view/movie/M/302240433.mp4',
  summary: '《复仇者联盟3：无限战争》是漫威电影宇宙10周年的历史性集结，将为影迷们带来史诗版的终极对决。面对灭霸突然发起的闪电袭击，复仇者联盟及其所有超级英雄盟友必须全力以赴，才能阻止他对全宇宙造成毁灭性的打击。',
};

var movies = [];
var item = null;
for (var i=1;i<=10;i++) {
  var item = Object.assign({}, movieItem, {_id: i});
  movies.push(item);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.fetch(function(err, movies){
    if (err) {
      console.log(err);
      return ;
    }
    res.render('movie/index', {
      title: '电影网站首页',
      movies: movies,
    });
  });
});

/* GET detail page. */
router.get('/detail/:id', function(req, res, next) {
  var id = req.params.id;
  Movie.findById(id, function(err, movie){
    if (err) {
      console.log(err);
      return;
    }
    res.render('movie/detail', {
      title: '电影网站详情页 - '+movie.title,
      movie: movie
      // movie: movies[req.params.id],
    });
  });
});

module.exports = router;

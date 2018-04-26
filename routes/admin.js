var express = require('express');
var router = express.Router();

var Movie = require('../models/movie.js');

var newMovieItem = {
  title: '黑豹',
  poster: 'https://img3.doubanio.com/view/photo/l/public/p2512123434.webp',
  director: '瑞恩·库格勒',
  country: '美国',
  year: '2018-03-09(中国大陆) / 2018-02-16(美国)',
  language: '英语',
  flash: 'http://vt1.doubanio.com/201802091710/fe66f008ead669c63922502cff426a7f/view/movie/M/302260827.mp4',
  summary: '在漫威影业的影片《黑豹》中，特查拉在其父亲——前瓦坎达国王去世之后，回到了这个科技先进但与世隔绝的非洲国家，继任成为新一任“黑豹”及国王。当旧敌重现时，作为“黑豹”及国王的特查拉身陷两难境地，眼看着瓦坎达及全世界陷于危难之中。面对背叛与危险，这位年轻的国王必须联合同盟，释放“黑豹”全部力量，奋力捍卫他的人民和国土。 ',
};

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
      return err;
    }
    res.render('admin/index', {
      title: '后台管理页面',
      movies: movies
    });
  });
});

/* GET add page. */
router.get('/add', function(req, res, next) {
  res.render('admin/add', {
    title: '新增电影页面',
    movie: newMovieItem
  });
});

/* GET update page. */
router.get('/update/:id', function(req, res, next) {
  var id = req.params.id;
  if (id) {
    Movie.findById(id, function(err, movie){
      if (err) { console.log(err); return; }
      res.render('admin/add', {
        title: '更新电影资料页面',
        movie: movie
      });
    });
  }
});

/* POST add new movie controller. */
router.post('/add', function(req, res, next) {
  var id = req.body._id;
  var movieObj = req.body;
  var _movie = null;

  if (id) {
    // 更新电影数据
    Movie.findById(id, function(err, movie){
      if (err) {
        console.log(err);
        return ;
      }
      _movie = Object.assign(movie, movieObj);
      _movie.save(function(err, movie){
        if (err) {
          console.log(err);
          return ;
        }
        res.redirect('/movie/detail/'+movie._id);
      });
    });
  } else {
    // 新增电影数据
    _movie = new Movie(movieObj);
    _movie.save(function(err, movie){
      if (err) {
        console.log(err);
        return ;
      }
      res.redirect('/movie/detail/'+movie._id);
    });
  }
});

/* DELETE . */
router.delete('/', function(req, res, next) {
  var id = req.body.id;
  if (!id) {
    return ;
  }
  Movie.remove({_id: id}, function(err, movie){
    if (err) {
      console.log(err);
      res.json({
        success: false,
        msg: JSON.stringify(err)
      });
    } else {
      res.json({
        success: true,
        msg: '删除成功'
      });
    }
  });
});


module.exports = router;

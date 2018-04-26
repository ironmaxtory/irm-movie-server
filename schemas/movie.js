/**
 * 创建模式
 */

var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  title: String,
  director: String,
  language: String,
  country: String,
  year: String,
  summary: String,
  flash: String,
  poster: String,
  meta: {
    createTime: {
      type: Date,
      default: Date.now()
    },
    updateTime: {
      type: Date,
      default: Date.now()
    }
  }
});


MovieSchema.pre('save', function(next){
  if (this.isNew) {
    this.meta.createTime = this.meta.updateTime = Date.now();
  } else {
    this.meta.updateTime = Date.now();
  }
  next();
});

// 为模式添加静态方法
MovieSchema.statics = {
  fetch: function(cb){
    return this
      .find({})
      .sort('meta.updateTime')
      .exec(cb);
  },
  findById: function(id, cb){
    return this
      .findOne({_id: id})
      .exec(cb);
  }
};


module.exports = MovieSchema;

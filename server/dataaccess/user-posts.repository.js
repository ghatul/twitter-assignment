const mongoService = require('./mongo.service');
const { userPosts, userCommnets } = require('./schema/user-posts');
const mongoose = require('mongoose');

class UserPostsRepository {

  createPosts(data, callback) {
    const db = mongoService.getDbInstance();
    const userPostModel = new userPosts(data);
    userPostModel.save(function (err, result) {
      if (err) {
        callback(err, null);
        return;
      }
      userPosts.findOne({_id: result._id}).populate('userInfo', '-password').
        exec(function (err, res) {
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, res);
        })
    })
  }

  updatePost(data, psotId, callback) {
    const db = mongoService.getDbInstance();
    const userCommnetsModel = new userCommnets(data);
    userPosts.findByIdAndUpdate({_id: mongoose.Types.ObjectId(psotId)}, {$push: {comments: userCommnetsModel}}, {new: true}).populate('userInfo', '-password').exec((err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    })
  }

  find(data, callback) {
    let query = data;
    const db = mongoService.getDbInstance();
    db.collection('myusers').find(query).toArray((err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  }

  getUserPosts(callback) {
    const db = mongoService.getDbInstance();
    userPosts.find({}).populate('userInfo', '-password')
    .populate({ path: 'comments.userInfo', select: '-password'}).
    sort({ 'created_on': -1 }).exec((err, result) => {
      if (err) {
        callback(err, null);  
        return;
      }
      callback(null, result);
    });
  }

  // updatedPosts(data, callback) {
  //   const userInfoModel = new userInfo(data);
  //   userInfoModel.save(function(err, result) {
  //     if(err) {
  //       callback(err, null);
  //       return;
  //     }
  //     callback(null, result);
  //   })
  // }

}

module.exports = new UserPostsRepository();
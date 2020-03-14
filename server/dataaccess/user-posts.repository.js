const mongoService = require('./mongo.service');
const userPosts = require('./schema/user-posts');

class UserPostsRepository {

  createPosts(data, callback) {
    const userPostModel = new userPosts(data);
    userPostModel.save(function (err, result) {
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
    db.collection('userposts').find({}).toArray((err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  }

  updatedPosts(data, callback) {
    const userInfoModel = new userInfo(data);
    userInfoModel.save(function(err, result) {
      if(err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    })
  }

}

module.exports = new UserPostsRepository();
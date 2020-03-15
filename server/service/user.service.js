const userRepository = require('./../dataaccess/user.repository');
const userPostRepository = require('./../dataaccess/user-posts.repository');

class UserService {

  login(data, callback) {
    userRepository.find(data, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    })
  }

  registration(data, callback) {
    userRepository.create(data, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    })
  }

  createPost(data, callback) {
    userPostRepository.createPosts(data, (err, result) => {
      if(err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    })
  }

  updatePost(data,postId, callback) {
    userPostRepository.updatePost(data, postId, (err, result) => {
      if(err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    })
  }

  getUserPosts(callback) {
    userPostRepository.getUserPosts((err, result) => {
      if(err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    })
  }

  userInfo(data, callback) {
    userRepository.createUserInfo(data, (err, result) => {
      if(err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    })
  }

  deletePost(postId, callback) {
    userPostRepository.deletePost(postId, (err, result) => {
      if(err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    })
  }

}

module.exports = new UserService();
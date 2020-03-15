const UserService = require('./../service/user.service');

class UserController {

  static login(req, res) {
    UserService.login(req.body, (err, result) => {
      if (err) {
        res.status(500).send({status: 500, err: err});
        return;
      }
      res.status(200).send({status: 200, data: {userId: result[0]._id}});
    })
  }

  static registration(req, res) {
    console.log('---req.body---', req.body);
    UserService.registration(req.body, (err, result) => {
      if (err) {
        res.status(500).send({status: 500, err: err});
        return;
      }
      res.status(200).send({status: 200, data: result});
    })
  }

  static createPost(req, res) {
    const io = req.io;
    UserService.createPost(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      io.emit('user post', result);
      res.status(200).send(result);
    })
  }

  static updatePost(req, res) {
    const postId = req.params.id;
    const io = req.io;
    UserService.updatePost(req.body, postId, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      io.emit('update post', result);
      res.status(200).send(result);
    })
  }

  static getUserPosts(req, res) {
    UserService.getUserPosts((err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(result);
    })
  }

  static userInfo(req, res) {
    UserService.userInfo(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(result);
    })
  }

  static deletePost(req, res) {
    const postId = req.params.id;
    const io = req.io;
    UserService.deletePost(postId, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      io.emit('delete post', {postId: postId});
      res.status(200).send(result);
    })
  }

}

module.exports = UserController;
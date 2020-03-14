const mongoService = require('./mongo.service');
const User = require('./schema/user.schema');
const userInfo = require('./schema/user.info');

class UserRepository {

  create(data, callback) {
    const userModel = new User(data);
    userModel.save(function (err, result) {
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
     if(!result.length) {
       callback({msg: "User name or pwd is wrong"}, null);
       return;
     }
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  }


  createUserInfo(data, callback) {
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

module.exports = new UserRepository();
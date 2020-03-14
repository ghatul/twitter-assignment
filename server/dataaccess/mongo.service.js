const mongoose =  require('mongoose');

class MongoService {

  constructor() {
    this.db = null;
  }

  static connect() {
    return new Promise((resolve, reject) => {
      const mongoDBUrl = 'mongodb://127.0.0.1/user';
      mongoose.connect(mongoDBUrl, { useNewUrlParser: true }, (err, connection) => {
        if (err) {
          reject(err);
          return;
        }
        this.db = connection.db;
        resolve();
      })
    })
  }

  static getDbInstance() {
    return this.db;
  }

}

module.exports = MongoService; 
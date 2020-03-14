const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userInfo = new Schema({
      companyName: {
        type: String,
        required: true
      },
      comapnyHeadQuarter: {
        type: String,
        required: true
      },
      companyAddress: {
        type: String,
        required: true,
      },
      employeeId: {
        type: String,
        required: true,
      },
      employeeDesignation: {
        type: String,
        required: true,
      },
      salary: {
        type: Number,
        required: true,
      },
});

const userInfoModel = mongoose.model("userInfo", userInfo);

module.exports = userInfoModel;

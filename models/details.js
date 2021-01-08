const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const detailsSchema = new mongoose.Schema({
  ourMission: {
    type: String,
  },
  aboutUs: {
    type: String,
  },
  adminEmail: {
    type: String
  },
  password: {
    type: String,
  }
})

// detailsSchema.pre("validate", function (next) {
//   if (this.password) {
//    this.hashedPassword = bcrypt.hashSync(this.password, 10);
//   }

//   next();
// });

module.exports = mongoose.model('Details', detailsSchema)
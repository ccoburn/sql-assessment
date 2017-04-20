const app = require('./index');
const db = app.get('db');

module.exports = {

  allUsers: function(req, res) {
    db.allUsers(function(err, users) {
      res.status(200).send(users);
    })
  }

}

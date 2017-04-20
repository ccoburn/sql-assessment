var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:Pogiako1!@localhost/assessbox";

const app = module.exports = express();


app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    // db.user_create_seed(function(){
    //   console.log("User Table Init");
    // });
    // db.vehicle_create_seed(function(){
    //   console.log("Vehicle Table Init")
    // });
})


app.get('/api/users', function(req, res) {
  db.allUsers(function(err, users) {
    res.status(200).send(users);
  })
})

app.get('/api/vehicles', function(req, res) {
  db.allVehicles(function(err, vehicles) {
    res.status(200).send(vehicles);
  })
})

app.post('/api/users', function(req, res) {
  db.addUser([req.body.firstname, req.body.lastname, req.body.email], function(err, added) {
    res.status(200).send(added);
  })
})

app.post('/api/vehicles', function(req, res) {
  db.addVehicle([req.body.make, req.body.model, req.body.year, req.body.ownerId], function(err, added) {
    res.status(200).send(added);
  })
})

app.get('/api/users/:userId/vehiclecount', function(req, res) {
  db.vehicleCount([req.params.userId], function(err, count) {
    res.status(200).send(count);
  })
})

app.get('/api/users/:userId/vehicle', function(req, res) {
  console.log(req.params);
  db.userVehicles([req.params.userId], function(err, count) {
    res.status(200).send(count);
  })
})

app.get('/api/vehicle', function(req, res) {
  db.vehicleByEmail([req.query.UserEmail], function(err, vehicles) {
    res.status(200).send(vehicles);
  })
})

app.get('/api/vehicle', function(req, res) {
  db.vehicleByFirst([req.query.userFirstStart], function(err, vehicles) {

    res.status(200).send(vehicles);
  })
})

app.get('/api/newervehiclesbyyear', function(req, res) {
  db.vehicleByYear( function(err, vehicles) {
    res.status(200).send(vehicles);
  })
})

app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res) {
  db.changeOwner([req.params.userId, req.params.vehicleId], function(err, change) {
    res.status(200).send(change)
  })
})

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res) {
  db.removeOwner([req.params.vehicleId], function(err, change) {
    res.status(200).send(change)
  })
})

app.delete('/api/vehicle/:vehicleId', function(req, res) {
  db.removeVehicle([req.params.vehicleId], function(err, change) {
    res.status(200).send(change)
  })
})



app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;

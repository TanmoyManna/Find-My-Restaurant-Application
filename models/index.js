const dbConfigUrl = require("../config/db.config");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfigUrl.url;
db.restaurant = require("./restaurant.model")(mongoose);

module.exports = db;

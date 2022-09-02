const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connetion Established!");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
    process.exit();
  });

require("./routes/restaurant.routes")(app);

app.listen(PORT, () => {
  console.log(`Connection Established on PORT ${PORT}`);
});

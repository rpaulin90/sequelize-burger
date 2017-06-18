// /**
//  * Created by rpaulin on 6/5/17.
//  */
//
// var express = require("express");
// var bodyParser = require("body-parser");
// var methodOverride = require("method-override");
//
// var port = 3000;
//
// var app = express();
//
// // Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static(process.cwd() + "/public"));
//
// app.use(bodyParser.urlencoded({ extended: false }));
//
// // Override with POST having ?_method=DELETE
// app.use(methodOverride("_method"));
//
// // Set Handlebars.
// var exphbs = require("express-handlebars");
//
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");
//
// // Import routes and give the server access to them.
// var routes = require("./controllers/burgers_controllers.js");
//
// app.use("/", routes);
//
// app.listen(port);
//


/////////////


var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");
//var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(process.cwd() + "/public"));
//app.use(methodOverride("_method"));

var db = require("./models");

require("./controllers/burgers_controllers")(app);

db.Customer.belongsTo(db.Burger);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});

const express = require("express");
const exphbs = require("express-handlebars");//import the express-handlebars module
const bodyParser = require("body-parser"); //import body parser
const SettingsBill = require("./settings-bill");// import our factory function
const app = express();//express ..
const settingsBill = SettingsBill();//factory function ..


//var moment = require('moment')


//Configure the express-handlebars
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
//app.engine(ext, callback)
//The app.engine() function is used to register the given template engine callback as ext
app.set("view engine", "handlebars");
//The app.set() function is used to assigns the setting name to value.......app.set(name, value)
//view engine, the template engine to use


//Middleware functions are functions that have access to the request object ( req ), the response object ( res ), and the next function in the application's
app.use(express.static("public"));
//The app.use() function is used to mount the specified middleware function(s) at the path which is being specified........app.use(path, callback)
//makes the public folder visible

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//1 default root
//The res.render() function is used to render a view and sends the rendered HTML/handlebar string to the client.
app.get("/", function (req, res) {
  res.render("index", {
    setting: settingsBill.getSettings(),
    totals: settingsBill.totals(),
    className: settingsBill.reachWarning(),
 // redirect values back to html after reload
  }); //to use res.render you need to configure a view engine first so i have to insatll express handlebars and body parser
});

app.post("/action", function (req, res) {
  console.log(req.body.actionType);

  settingsBill.recordAction(req.body.actionType);

  res.redirect("/");
});
app.post("/settings", function (req, res) {
  settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel,
  });
  console.log(settingsBill.getSettings());

  res.redirect("/");
});
app.get("/actions", function (req, res) {
  res.render("actions", {actions: settingsBill.actions()});

});
app.get("/actions/:actionType", function (req, res) {
  const actionType = req.params.actionType
  res.render("actions", {
    actions: settingsBill.actionsFor(actionType)
  })
});

let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
  console.log("App starting on port", PORT); // message displayed on the terminal
});

//change the port number without changing the code ...>>> export PORT3=3012/set PORT3=3012 and to set the PORT to the default PORT ...>>> unset PORT

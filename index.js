const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser"); //import body parser
const SettingsBill = require("./settings-bill");
const app = express();
const settingsBill = SettingsBill();

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public")); //makes the public folder visible

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//1 default root
app.get("/", function (req, res) {
  res.render("index", {
    setting: settingsBill.getSettings(),
    totals: settingsBill.totals(), // redirect values back to html after reload
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
  res.render("actions", {actions: settingsBill.actionsFor(actionType)})
});

let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
  console.log("App starting on port", PORT); // message displayed on the terminal
});

//change the port number without changing the code ...>>> export PORT3=3012/set PORT3=3012 and to set the PORT to the default PORT ...>>> unset PORT

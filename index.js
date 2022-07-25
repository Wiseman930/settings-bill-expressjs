const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser'); //import body parser
const app = express();

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static("public")) //makes the public folder visible

app.use(bodyParser.urlencoded({ extended: false })) //line 10 to 13 sets up the body parser

// parse application/json
app.use(bodyParser.json())

//1 default root
app.get("/", function(req, res){
  res.render("index");  //to use res.render you need to configure a view engine first so i have to insatll express handlebars and body parser
});

app.post('/action', function(req, res){

})
app.post('/settings', function(req, res){
    console.log(req.body);
    res.redirect('/')
})
app.get('/actions', function(req, res){

})
app.get('/actions/:type', function(req, res){

})

let PORT = process.env.PORT || 3009;

app.listen(PORT, function(){
  console.log('App starting on port', PORT); // message displayed on the terminal
});

//change the port number without changing the code ...>>> export PORT3=3012/set PORT3=3012 and to set the PORT to the default PORT ...>>> unset PORT
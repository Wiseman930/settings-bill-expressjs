let express = require('express');
var exphbs  = require('express-handlebars');
let app = express();

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//1 default root
app.get("/", function(req, res){
  res.render("index"); //to use res.render you need to configure a view engine first so i have to insatll express handlebars and body parser
});

app.post('/action', function(req, res){

})
app.post('/settings', function(req, res){

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
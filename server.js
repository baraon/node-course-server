const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view.engine', 'hbs');


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log +'\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs');
});
*/

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	//res.send('<h1>hello</h1>');
	res.render('home.hbs', {
		pageTitle: 'Baraon',
		welcomeMessage: 'Welcome to my test app!',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'error as heck',
	});
});

app.listen(3000);

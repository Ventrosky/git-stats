const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require( 'cors');

const gh = require( './api/github');
const qname = require( './middleware/qname').qname;
const logger = require( './middleware/logger').logger;

const app = express();

app.use(cors({origin: '*'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(logger);
app.use(qname);

const port = process.env.PORT || 8055;

app.use(express.static('public'));

app.get('/events', async function(req, res){
    let data = await gh.octoUserEvents(req.qname);
    res.send(data);
});

app.get('/repos', async function(req, res){
    let data = await gh.octoUserRepos(req.qname);
    res.json(data);
});

app.get('/treemap', async function(req, res){
    let data = await gh.octoUserTreemap(req.qname);
    res.json(JSON.stringify(data));
});

app.get('/streemap', async function(req, res){
    let data = await gh.octoUsrSmplTreemap(req.qname);
    res.json(JSON.stringify(data));
});

app.get('/', function(req, res) {
    res.sendFile('views/index.html', {root: __dirname })
});

app.listen(port, () => console.log(`App listening on port ${port}`));

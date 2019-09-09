const dotenv = require('dotenv');
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import gh from './api/github';
import qname from './middleware/qname';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(qname);

const port = process.env.PORT || 8055;

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

app.listen(port, () => console.log(`App listening on port ${port}`));

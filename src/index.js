const dotenv = require('dotenv');
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import gh from './api/github';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const port = process.env.PORT || 8055;

app.get('/events', async function(req, res){
    let data = await gh.octoUserEvents(req.query.name);
    res.send(data);
});

app.get('/repos', async function(req, res){
    let data = await gh.octoUserRepos(req.query.name);
    res.json(data);
});

app.get('/treemap', async function(req, res){
    let data = await gh.octoUserTreemap(req.query.name);
    res.json(JSON.stringify(data));
});

app.get('/streemap', async function(req, res){
    let data = await gh.octoUsrSmplTreemap(req.query.name);
    res.json(JSON.stringify(data));
});

app.listen(port, () => console.log(`App listening on port ${port}`));

const Octokit = require('@octokit/rest');
require('dotenv').config();

// DOCS: https://octokit.github.io/rest.js/

const octo = new Octokit({
    auth: process.env.API_TOKEN
})

export default octo;
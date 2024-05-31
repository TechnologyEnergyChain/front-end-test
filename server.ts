const express = require('express');
const http = require('http');
const https = require('https');


const app = express();
const server = http.createServer(app);

const PORT = 3000;

let urlRAE = 'dle.rae.es';

//response RAE: {"approx":0,"res":[{"header":"hola","id":"KYtLWBc","grp":0}]}

//@ts-ignore
app.get('/game/exist', (req, res) => {
    const word = req.query?.word;

    const options = {
        hostname: `${urlRAE}`,
        path: `/data/search?m=30&w=${word}`,
        port: 443,
        method: 'GET',
        headers: {
            'Authorization': 'Basic cDY4MkpnaFMzOmFHZlVkQ2lFNDM0',
            'User-Agent': 'The app ;)'
        }
    };
    let body = '';
    //@ts-ignore
    const request = https.request(options, response => {

        //@ts-ignore
        response.on('data', chunk => {
            body = body + chunk;
        });

        response.on('end', function () {
            console.log("Body :" + body);
            if (body && JSON.parse(body).res.length > 0) {
                console.debug('exist');
            } else {
                console.debug('not exist');
            }
        });
    });

    //@ts-ignore
    request.on('error', err => {
        console.debug(err)
    });

    request.write(body);
    request.end();

});


server.listen(PORT, () => {
    console.log(`Mock api wordle is listen on port ${PORT}`)
});
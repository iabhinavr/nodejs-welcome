const http = require('http');
const fs = require('fs');

let server = http.createServer( async(req, res) => {
    if(req.url == '/') {
        try {
            let pageData = await readFile('./homePage.html');
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(pageData);
            return res.end();
        } catch (err) {
            console.log(err);
            res.writeHead(400, {'Content-Type' : 'text/plain'});
            res.end('Sorry! Some error occurred');
        }

    }
    else {
        res.writeHead(404, {'Content-Type' : 'text/plain'});
        res.end('Sorry! The page does not exist');
    }
});


function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

const port = process.env.PORT || 8080;

server.listen(port);
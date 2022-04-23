const http = require('http');
const fs = require('fs');

let server = http.createServer( async(req, res) => {
    if(req.url == '/') {
        try {
            let html = await readFile('./homePage.html');
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(html);
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
        fs.readFile(path, (err, fileContent) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(fileContent);
            }
        });
    });
}

const port = process.env.PORT || 8080;

server.listen(port);
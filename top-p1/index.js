const https = require('http');
const fs = require('fs');
const url = require('url');
const hostname = '127.0.0.1';
const port = 8080;

const server = https.createServer((req, res) => {
    var reqUrl = url.parse(req.url);
    let filename = "";
    if(reqUrl.path == "/"){
        filename = "./src/" + "index.html";
    } else {
        filename = "./src" + reqUrl.path;
    }

    console.log(filename);

    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write(fs.readFileSync('./src/404.html', (err, data) => {
                if (err) throw err;
                return data;
            }
        ));

            return res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
    

   
    
        
    
}).listen(port, hostname, () => {
    console.log(`Listening on http://${hostname}:${port}`)
});
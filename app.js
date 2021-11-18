const http = require('http');
const data = [];
const qs = require('querystring');
const port = 8900;

const server = http.createServer((req,res)=>{
    if ('/' == req.url){
        switch(req.method){
            case 'GET':
                showForm(res)
                break;
            case 'POST':
                processData(req,res);
                break;
            default:
                badRequest(res);
        }
    }else{
        NotFound(res);
    }
});

function showForm(res){
    let html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FORM</title>
    </head>
    <body>
        <h1> data </h1>
        <form action="/" method="post">
        <p> <input type="text" name="hobi"></p>
        <p><input type="submit" value="Simpan"></p>
        </form>
    </body>
    </html>`
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(html);
}

function processData(req,res){
    var body = '';
    req.setEncoding('utf-8');
    req.on('data',function(chunk){
        body += chunk;
    });
    req.on('end',function(){
        var data = qs.parse(body);
        res.setHeader('Content-Type','text/plain');
        res.end('data: '+ data.data);
    })
}

function badRequest(res){
    res.statusCode = 400;
    res.Header('Content-Type','text/plain');
    res.end('400- Bad Request');
}

function NotFound(res){
    res.statusCode= 404;
    res.setHeader('Content-Type','text/plain');
    res.end('404-Not Found');
}

server.listen(7777,()=>{
    console.log('server running at http://localhost:7777');
})
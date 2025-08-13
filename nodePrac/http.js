const http = require('node:http');

console.log(process.env)

const desirePort = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.statusCode = 200; //funcionando
        res.setHeader('Content-Type', 'text/plain' + '; charset=utf-8');
        res.end('Bienvenido a la página de inicio');
    }else if(req.url === '/contacto') {
        res.statusCode = 200; //funcionando
        res.setHeader('Content-Type', 'text/plain' + '; charset=utf-8');
        res.end('Esta es la página de contacto');
    } else{
        res.statusCode = 404; //no encontrado
        res.setHeader('Content-Type', 'text/plain' + '; charset=utf-8');
        res.end('Página no encontrada :( - 404');
    }
    // console.log('request received: ' , req.url);
});

server.listen(desirePort, () => {
    console.log(`Server is listening on port ${desirePort}`);
});
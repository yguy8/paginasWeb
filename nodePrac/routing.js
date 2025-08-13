const http = require('node:http');

const server = http.createServer((req, res) => {

});

server.listen(3001, () => {
    console.log('Server is listening on port http://localhost:3001');
})
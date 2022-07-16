require('dotenv').config();
const app = require('./app');
const { connect } = require('./database');
var ip = require("ip");
var GlobalApp = require('./global/global_app');
async function main() {
    // Database Connection
    await connect();

    // Express Application
    var port = process.env.PORT || 3000;
    const server = await app.listen(port);

    //SOCKET

    GlobalApp.link = `http://${ip.address()}:${port}/${GlobalApp.domain}`;
    console.log(`Servidor levantado => http://localhost:${port}/${GlobalApp.domain}`);
    console.log(`Servidor levantado => ${GlobalApp.link}`);
    console.log(`Documnetación => ${GlobalApp.link}/apidoc/index.html`);
};

main();
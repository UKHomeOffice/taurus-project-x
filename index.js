import {Server} from "./src/Server/Server";
import * as routes from "./src/Routes/routes";
import {RoutesProvider} from "./src/Server/RoutesProvider/RoutesProvider";
import {HapiProvider} from "./src/Server/HapiProvider/HapiProvider";


const hapiProvider = new HapiProvider(),
    routesProvider = new RoutesProvider(routes),
    server = new Server(routesProvider, hapiProvider);

server.start((err) => {

    if (err) throw err;

    console.log(`Server running at: ${server.hapiServer.info.uri}`);

});

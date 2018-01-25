const Hapi = require("hapi");

export class HapiProvider {

    get() {

        if (!this.hapiServer) {

            this.hapiServer = new Hapi.Server();
        }

        return this.hapiServer;
    }

}
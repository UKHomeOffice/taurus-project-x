import * as Promise from "bluebird";
// import {Provide} from "@homeoffice/di-js";
import {Http} from "./Http";


// @Provide(Http)
export class HttpMock {

    get() {

        return Promise.resolve(this.response);
    }
}
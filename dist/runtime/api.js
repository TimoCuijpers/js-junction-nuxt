import _ from "lodash";
import Request from "./request.js";
import Batch from "./batch.js";
import responseEventsMixin from "./mixins/responseEventsMixin.js";
export default class Api {
  constructor() {
    this._requests = [];
    this.host("http://localhost:8080").suffix("");
    this._initResponseEvents();
  }
  /**
   * @param {string} host
   *
   * @returns {this} The current instance.
   */
  host(host) {
    this._host = host;
    return this;
  }
  /**
   * @param {string} suffix
   *
   * @returns {this} The current instance.
   */
  suffix(suffix) {
    if (!_.startsWith(suffix, "/") && suffix) {
      suffix = `/${suffix}`;
    }
    this._suffix = suffix;
    return this;
  }
  /**
   * @returns {string} Url containing the host and suffix.
   */
  get baseUrl() {
    let url = "";
    if (this._host) url += this._host;
    if (this._suffix) url += this._suffix;
    return url;
  }
  /**
   * @param {Request} request
   */
  cancelRunning(request) {
    if (!request.key) {
      return;
    }
    this._requests[request.key]?.cancel();
    this._requests[request.key] = request;
  }
  /**
   * @param {Request} request
   */
  removeRequest(request) {
    if (!request.key) {
      return;
    }
    if (request.response.isFinished) {
      delete this._requests[request.key];
    }
  }
  /**
   * @param {string} uri
   *
   * @returns {Request} The created request.
   */
  request(uri) {
    if (!uri) throw new Error(`Request url is empty.`);
    if (!_.startsWith(uri, "/")) {
      uri = `/${uri}`;
    }
    const request = new Request();
    request.setUrl(uri).setApi(this);
    return request;
  }
  /**
   * @returns {this} The current instance.
   */
  cancelRequests() {
    this._requests.forEach((request) => {
      request.cancel();
    });
    this._requests = [];
    return this;
  }
  /**
   * @param {array} requests
   * @returns Batch
   */
  batch(requests) {
    return new Batch(requests);
  }
  /**
   * @param {string} token
   */
  setBearer(token) {
    this.setHeader("Authorization", "Bearer " + token);
  }
  resetBearer() {
    this.removeHeader("Authorization");
  }
  // /**
  //  * @param {string} token
  //  */
  // setCsrf (token) {
  //     this.setHeader('X-CSRF-TOKEN', token);
  // }
  //
  // resetCsrf () {
  //     this.removeHeader('X-CSRF-TOKEN');
  // }
  // /**
  //  * @param {string} key
  //  * @param {string} value
  //  */
  // setHeader (key, value) {
  //     useFetch().defaults.headers.common[key] = value;
  // }
  //
  // /**
  //  * @param {string} key
  //  */
  // removeHeader (key) {
  //     delete useFetch().defaults.headers.common[key];
  // }
  /**
   * @param {function(Response)} onSuccess
   * @param {function(Error)} onError
   *
   * @returns {this}
   */
  responseInterceptors(onSuccess = () => {
  }, onError = () => {
  }) {
    this.request();
  }
}
Object.assign(Api.prototype, responseEventsMixin);

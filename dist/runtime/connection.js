import _ from 'lodash';
import Response from './response.js';
// import axios from 'axios';
import { useSanctumClient } from "#imports";
import Api from "./api.js";

export default class Connection {
    constructor () {
        this._abortController = null;

        this._config = {};
        this._api = new Api();

        this.running = false;
        this.canceled = false;
        this.failed = false;
    }

    cancel () {
        if (! this._abortController || ! this.running) return this;

        this._abortController.abort();

        this.canceled = true;
    }

    cancelRunning (request) {
        this._api?.cancelRunning(request);
    }

    removeRequest (request) {
        this._api.removeRequest(request);
    }

    getConfig () {
        return this._config;
    }

    setConfig (config) {
        this._config = config;
    }

    setApi (api) {
        this._api = api;
    }

    async get (query, params) {
        return this._execute(query, 'get', params);
    }

    async post (query, data) {
        return this._execute(query, 'post', data);
    }

    async put (query, params) {
        return this._execute(query, 'put', params);
    }

    async delete (query) {
        return this._execute(query, 'delete');
    }

    async _execute (url, method, body) {
        this.running = true;

        if (! _.startsWith(url, '/')) {
            url = `/${url}`;
        }

        const response = new Response();

        const config = {
            url: (this._api ? this._api.baseUrl : 'http://localhost:3000') + url,
            method,
            ...({
                [method === 'get' ? 'params' : 'body']: body,
            }),
            signal: (this._abortController = new AbortController()).signal,
            async onResponse({request: req, response: res, options: opt}) {
                response.setOfetchResponse(res)
            },
            async onResponseError({request: req, response: res, options: opt}) {
                response.setOfetchError(res)
            },
        };

        const client = useSanctumClient()

        await client(url, Object.assign(config, this._config))
          .finally(() => {
              this.running = false;
          })

        return response;
    }
}

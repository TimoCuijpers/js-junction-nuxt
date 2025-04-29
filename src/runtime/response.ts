// const axios = useSanctumAppConfig();
// import axios from 'axios';

export default class Response {
    constructor () {
        this._ofetchResponse = null;
        this._ofetchError = null;

        this.data = null;
        this.validation = null;
    }

    /**
     * @deprecated Use `isFailed` instead.
     * @returns {boolean}
     */
    get failed () {
        return this.isFailed;
    }

    /**
     * @returns {boolean}
     */
    get isFailed () {
        return this.statusCode >= 400;
    }

    /**
     * Check whether the request is finished and returned a response.
     *
     * @returns {boolean}
     */
    get isFinished () {
        return this._ofetchResponse !== null;
    }

    /**
     * Check whether the request was cancelled.
     *
     * @returns {boolean}
     */
    get isCancelled () {
        return this._ofetchError;
    }

    /**
     * @returns {Number} The HTTP response status code.
     */
    get statusCode () {
        return this._ofetchResponse?.status;
    }

    setOfetchResponse(ofetchResponse) {
        this._ofetchResponse = ofetchResponse;

        switch (this.statusCode) {
            case 200:
            case 400:
                this.data = this._ofetchResponse._data;
                break;
            case 422:
                this.validation = this._ofetchResponse._data;
                break;
        }
    }

    setOfetchError (ofetchError) {
        this._ofetchError = ofetchError;

        if (ofetchError.response) {
            this.setOfetchResponse(ofetchError.response);
        }
    }
}

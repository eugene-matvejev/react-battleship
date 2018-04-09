import axios from 'axios';

const createAxiosCallback = (method, route, onSuccess, onError) => (params, _onSuccess, _onError) => {
    params['method'] = method;

    return axios
        .request(route, { params })
        .then((r) => {
            _onSuccess ? _onSuccess(r) : onSuccess(r);
        })
        .catch((r) => {
            _onError ? _onError(r) : onError(r);
        });
};

export default createAxiosCallback;

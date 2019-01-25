import JsonP from 'jsonp';

export default class Axios{
    static jsonp(options) {
        return new Promise((reslove, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status === 'success') {
                    reslove(response);
                } else {
                    reject(response.message)
                }
            })
        })
    }
}
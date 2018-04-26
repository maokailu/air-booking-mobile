
/**
 * 截取URL参数
 * @param {string} name 截取的key
 * @param {string} [url] 被截取的url
 * @returns {string} 截取的val
 */
let urlParam = (name, url) => {
    let reg = new RegExp('.*[&?]' + name + '=([^&]*)(&|$)');
    let r;
    if (!url) {
        r = window.location.search.match(reg);
    } else {
        r = url.match(reg);
    }
    if (r) return decodeURIComponent(r[1]);
    return '';
};
/**
* 判断是否是手机号
* @param {string} val 传进来的字符串
*/
let isMobile = (val) => {
    let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return reg.test(val);
};
const getPromise = (url, params) => {
    const promise = new Promise(function(resolve, reject) {
        // 原生方式
        const handler = function() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest();
        const path = params ? url + '?' + params : url;
        client.open('GET', path);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.send();
        // zepto方式
        // $.ajax({
        //     type: 'GET',
        //     url: url,
        //     data: params,
        //     success: function(result) {
        //     }
        // });
    });
    return promise;
};
export default {
    'urlParam': urlParam,
    'isMobile': isMobile,
    'getPromise': getPromise
};

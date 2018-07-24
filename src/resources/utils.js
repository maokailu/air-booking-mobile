
/**
 * 截取URL参数
 * @param {string} name 截取的key
 * @param {string} [url] 被截取的url
 * @returns {string} 截取的val
 */
let getUrlParam = (name, url) => {
    let reg = new RegExp('.*[&?]' + name + '=([^&]*)(&|$)');
    let r;
    if (!url) {
        r = window.location.hash.match(reg);
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
        let host;
        if (location.host.indexOf('localhost') !== -1) {
            host = 'http://www.restart1025.com/booking/';
        } else {
            host = './';
        }
        let path = host + url;
        client.open('POST', path);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        client.withCredentials = true;
        const json = JSON.stringify(params);
        json ? client.send(json) : client.send();
    });
    return promise;
};
const isEmpty = obj =>{
    if (Object.keys(obj).length === 0) {
        return true;
    } else {
        return false;
    }
};
const getCookie = (name) =>{
    const cookieName = encodeURIComponent(name) + '=';
    const cookieStart = document.cookie.indexOf(cookieName);
    let cookieValue = null;
    if (cookieStart > -1) {
        let cookieEnd = document.cookie.indexOf(';', cookieStart);
        if (cookieEnd === -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd),
            'UTF-8');
    }
    return cookieValue;
};

export default {
    'getUrlParam': getUrlParam,
    'isMobile': isMobile,
    'getPromise': getPromise,
    'isEmpty': isEmpty,
    'getCookie': getCookie
};

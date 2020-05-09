
/**
 * 截取URL参数
 * @param {string} name 截取的key
 * @param {string} [url] 被截取的url
 * @returns {string} 截取的val
 */
export const getUrlParam = (name, url) => {
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
export const isMobile = (val) => {
    let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return reg.test(val);
};
export const fetchData = (url, params, method = 'POST') => {
    const requestPromise = new Promise((resolve, reject) => {
        const handler = () => {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(new Error(xhr.statusText));
            }
        };
        const xhr = new XMLHttpRequest();
        const host = './';
        const path = host + url;
        xhr.open(method, path);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        const json = JSON.stringify(params);
        json ? xhr.send(json) : xhr.send();
    });
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), 10000);
    });
    return Promise.race([requestPromise, timeoutPromise]);
};
export const isEmpty = obj =>{
    if (Object.keys(obj).length === 0) {
        return true;
    } else {
        return false;
    }
};
export const getCookie = (name) =>{
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

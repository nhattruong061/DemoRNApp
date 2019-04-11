
// import * as types from '../common/method.types';
// import config from '../../../configs';
// import UserStorage from '../../storage/user.storage';
// import SecurityUtils from './SecurityUtils';
// import { deepTrim } from './CommonUtils';
// import { getTimeZone } from './DateTimeUtils';
// import { TOKEN_EXTEND_TIME } from '../../core/common/constants';

// function HttpRequest() {

// }
// function getUrl(url) {
//   return config.API_URL + url;
// }


// function getHeaders(method, url, body = {}, user = {}) {
//   let headers, token, secret;

//   if (body.data && body.data.username && body.data.password) {
//     token = body.data.username;
//     secret = body.data.password;

//   } else {

//     token = user ? user.token : null;
//     secret = user ? user.secret : null;

//   }

//   headers = getSecurityHeaders(method, url, body, token, secret);

//   headers['Accept'] = 'application/json';
//   headers['Content-Type'] = 'application/json';
//   headers['Accept-Language'] = 'da, en-gb;1=0.8, en;q=0.7';
//   headers['Authorization'] = 'Bearer ' + token;
//   headers['TimeZone'] = getTimeZone();

//   return headers;
// }

// function sortObject(obj) {
//   let keys = Object.keys(obj).sort(),
//     sortedObj = {};

//   for (let i in keys) {
//     if (keys.hasOwnProperty(i)) {
//       if (obj[keys[i]] === null) {
//         sortedObj[keys[i]] = obj[keys[i]];
//       }
//       else {
//         if (Object.prototype.toString.call(obj[keys[i]]) === "[object Array]" || typeof obj[keys[i]] === "object") {
//           obj[keys[i]] = sortObject(obj[keys[i]]);
//         }
//         sortedObj[keys[i]] = obj[keys[i]];
//       }
//     }
//   }

//   return sortedObj;
// }

// function getSecurityHeaders(method, path, body, token, secret) {
//   body = JSON.stringify(sortObject(body));

//   let nonce = SecurityUtils.generateNonce();
//   let timestamp = SecurityUtils.generateTimestamp();
//   let signature = SecurityUtils.generateSignature(method, path, timestamp, nonce, body, token, secret);

//   return {
//     Signature: signature,
//     Timestamp: timestamp,
//     Nonce: nonce
//   };
// }

// async function async(method, url, body) {
//   let user = await UserStorage.getUserInfo();

//   let urlEncoded = encodeURI(url);
//   let headers = getHeaders(method, urlEncoded, body, user);
//   let apiUrl = getUrl(urlEncoded);
//   try {
//     let response = await fetch(apiUrl, {
//       method,
//       headers,
//       body: method === types.GET_METHOD ? null : JSON.stringify(body),
//     });
//     let responseJson = await response.json();
//     const { status } = await response;
//     if (responseJson) {

//       if (user) {
//         user.expireAt = new Date(new Date().setHours(new Date().getHours() + parseInt(TOKEN_EXTEND_TIME)));
//         UserStorage.setUserInfo(user);
//       }

//       return {
//         status,
//         ...responseJson
//       };
//     }
//   } catch (error) {
//     const { t0: { message = "Service Unavailable" } = {} } = error;
//     return {
//       status: 503,
//       message
//     }
//   }
// }

// HttpRequest.get = function (url, resource) {
//   let method = types.GET_METHOD;
//   return async(method, url, {});
// };

// HttpRequest.post = function (url, resource, body) {
//   let method = types.POST_METHOD;
//   deepTrim(body);
//   let data = {
//     data: body,
//     meta: resource
//   };
//   return async(method, url, data);
// };

// HttpRequest.put = function (url, resource, body) {
//   let method = types.PUT_METHOD;
//   deepTrim(body);
//   let data = {
//     data: body,
//     meta: resource
//   };
//   return async(method, url, data);
// };

// HttpRequest.delete = function (url, resource, body) {
//   let method = types.DELETE_METHOD;
//   let data = {
//     data: body,
//     meta: resource
//   };
//   return async(method, url, data);
// };

// export default HttpRequest;
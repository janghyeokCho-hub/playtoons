import Config from "../env/config";
import store from "../modules/redux/store";
import { request } from "./request";
import { call, put } from "redux-saga/effects";

export function buildUrl(url, parameters) {
  let qs = "";
  for (const key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      const value = parameters[key];
      qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    url = url + "?" + qs;
  }

  return url;
}

/**
 * @description 공통 쿼리 처리 함수
 * @param {*} query
 */
export function query(query) {
  let newQuery = query;
  for (var k in newQuery) {
    if (newQuery[k] === undefined || newQuery.k === "") delete newQuery[k];
  }
  return newQuery;
}

/**
 * @description type으로 path로 치환하는 함수
 * @param string type
 * @returns {}
    {
        method : "GET" | "POST" | "UPDATE" | "DELETE",
        path : string
    }
 */
export const getPath = (type) => {
  if (!type) {
    return;
  }

  const reg2 = /[^_]+/gm;
  const str = type;
  let m;

  let arr = [];
  while ((m = reg2.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === reg2.lastIndex) {
      reg2.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      arr.push(match);
    });
  }

  let method = arr.shift();
  // . 이 있는 경우에는 Camel 형태로 변경해 준다.
  arr = arr.map(function (item) {
    if (item.indexOf("$") > -1) {
      var itemList = item.toLowerCase().split("$");

      for (var i = 1; i < itemList.length; i++) {
        itemList[i] = itemList[i][0].toUpperCase() + itemList[i].substr(1);
      }
      return itemList.join("");
    } else {
      return item.toLowerCase();
    }
  });

  switch (method) {
    case "LOAD":
      method = "GET";
      break;
    case "VIEW":
      method = "GET";
      arr.push("view");
      break;
    case "INSERT":
      method = "POST";
      break;
    case "PUT":
      method = "PUT";
      break;
    case "PATCH":
      method = "PATCH";
      break;
    case "DELETE":
      method = "DELETE";
      break;
    default:
      method = "GET";
      break;
  }

  var path = arr.join("/"); //.toLowerCase();
  return { method, path: "/" + path };
};

export function load(type, params = {}, cb) {
  return {
    type,
    params,
    cb,
  };
}

export function loadResult(err, values) {
  var { type, result, params } = values;
  if (err) {
    return {
      type: type + "_ERROR",
      params,
      err,
    };
  } else {
    return {
      type: type + "_COMPLETED",
      params,
      result,
    };
  }
}

function loading(type, value) {
  return {
    type: type + "_LOADING",
    value,
  };
}

export function* loadSaga(action) {
  const { type } = action;
  let { params } = action;

  const accessToken = getAccessToken();

  let url = Config.apiUrl;

  let options = { headers: {} };
  if (accessToken) options.headers.Authorization = "Bearer " + accessToken;
  const { method, path } = getPath(type);
  params = query(params);

  options.method = method;

  if (method === "GET") options.url = buildUrl(url + path, params);
  else {
    options.url = url + path;
    options.data = params;
  }

  try {
    yield put(loading(type, true));
    var result = yield call(request, options);
    if (result && result.data) {
      yield put(loadResult(undefined, { type, result: result.data, params }));
    }
  } catch (err) {
    yield put(loadResult(err, { type, params }));
  }
  yield put(loading(type, false));
}

export const requestPromise = (type, params, isForm = false) => {
  return new Promise(async function (resolve, reject) {
    // const accessToken = getAccessToken();

    let url = Config.apiUrl;
    let options = {};
    options.headers = {};

    /*
    if (accessToken) {
      options.headers.Authorization = "Bearer " + accessToken;
    } else {
      options.headers.Authorization = undefined;
    }
    */

    const { method, path } = getPath(type);
    params = query(params);
    options.method = method;
    if (method === "GET") {
      options.url = buildUrl(url + path, params);
    } else {
      options.url = url + path;
      options.data = params;
    }
    request(options)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        resolve(err.response);
      });
  });
};

const getAccessToken = () => {
  let accessToken = undefined;
  try {
    const state = store?.getState();

    if (state) {
      accessToken = authSelector(state);
    }
  } catch (err) {
    console.error(err);
  }
  return accessToken;
};

const authSelector = (state) => {
  try {
    return state.data.sign.author.access_token;
  } catch (err) {
    return undefined;
  }
};

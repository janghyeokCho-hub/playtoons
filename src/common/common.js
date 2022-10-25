import { getFileUrlFromServer } from "@API/fileService";
import moment from "moment/moment";
import { DATE_FORMAT, RESULT_CODE_LIST } from "./constant";
/**
 * Email validation
 * @param {string} text
 * @returns true || false
 */
export const emailValidation = (text) => {
  const regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regEmail?.test(text);
};

/**
 * 값을 체크해 default값이나 value 를 리턴
 * @version 1.0.0
 * @author 이현국
 * @param value
 * @param default
 * @return value 없다면 default 있다면 value
 */
export const getValueOrDefault = (value, d) => {
  return value === undefined ? d : value;
};

/**
* 현재 사이즈를 resize 시켜 return
  getResizedNumber("128px", 0.6)
    => 76.8px
* @version 1.0.0
* @author 이현국
* @param strSize  문자형 size data
* @param resize   리사이즈
* @return 리사이즈된 문자형 size data
*/
export const getResizedNumber = (strSize, resize) => {
  if (strSize === undefined || strSize === null) {
    return strSize;
  } else {
    let number = strSize.replace(/[^0-9]/g, "");
    let strUnit = strSize.replace(/[0-9]/g, "");
    return number * resize + strUnit;
  }
};

/**
 * JSON string 인지 확인하는 함수
 * @version 1.0.0
 * @author 조장혁
 * @param {string} str
 * @returns
 */
export const isJSONStr = (str) => {
  try {
    return typeof JSON.parse(str) == "object";
  } catch (e) {
    return false;
  }
};

/**
*
   get request를 위해서 params로 url 생성
*
* @version 1.0.0
* @author 2hyunkook
* @param formData formData 객체
* @return url get method에서 사용할 url
*/
export const getGetMethodUrl = (formData) => {
  let url = "?";

  if (formData !== undefined) {
    for (const item of formData.entries()) {
      url += `${item[0]}=${item[1]}&`;
    }
  }

  return url.slice(0, -1);
};

/**
*
   form 태그 안의 값을 json object 로 반환해준다.
*
* @version 1.0.0
* @author 2hyunkook
* @param refForm form ref 객체
* @return json object
*/
export const getFromDataJson = (refForm) => {
  const form = refForm.current;
  let obj = {};

  for (let i = 0; i < form.length; i++) {
    obj[form[i].name] = form[i].value;
  }

  delete obj[""];
  return obj;
};

/**
*
   list 에서 value 를 제거해준다.
*
* @version 1.0.0
* @author 2hyunkook
* @param list list object
* @param value list 에서 제거할 value
* @return
*/
export const removeItemInList = (list, value) => {
  return list.filter((item) => {
    return item !== value;
  });
};

/**
*
   R-19 check 를 확인해서 code 값 리턴
*
* @version 1.0.0
* @author 2hyunkook
* @param ref R-19 input ref 객체
* @return G, PG-13, R-15, R-17, R-18, R-18G
*/
export const getRatingToChecked = (ref) => {
  return ref.current.checked ? 'R-18' : 'G';
};

/**
 * json object to string
 * @returns
 */
export const getParamsToQuery = (params, tags) => {
  try {
    let query = "?";

    Object.entries(params).forEach(([key, value], index) => {
      if (index > 0) {
        query += `&`;
      }
      query += `${key}=${value}`;
    });

    if (tags?.length) {
      tags.forEach((tag) => (query += `&tags=${tag.name}`));
    }

    return query;
  } catch (e) {
    console.error(e);
  }
};

/**
*
   response 의 result code로 에러메세지를 리턴받는다.
*
* @version 1.0.0
* @author 2hyunkook
* @param response api response
* @return 에러메세지
*/
export const getErrorMessageFromResultCode = (response) => {
  let returnMessage = '' + response;

  for( let i = 0; i < RESULT_CODE_LIST.length; i++ ){
    if( RESULT_CODE_LIST[i].code === response?.result ){
      returnMessage = RESULT_CODE_LIST[i].name + ' ' + response;
      break;
    }
  }
  
  return returnMessage;
};

/**
*
   date format
*
* @version 1.0.0
* @author 2hyunkook
* @param date date 정보
* @param separator 구분자
*/
export const getDateYYYYMMDD = (date, separator) => {
  return moment(date).format( ['YYYY', 'MM', 'DD'].join(separator) );
};

/**
*
   date format
*
* @version 1.0.0
* @author 2hyunkook
* @param date date 정보
* @param separator 구분자
*/
export const setInputValueToNumber = (ref, value) => {
  ref.current.value = value.replace(/[^0-9]/g, '');
};

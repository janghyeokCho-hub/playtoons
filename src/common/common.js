import ConfirmPopup from "@/components/dashboard/ConfirmPopup";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import { logoutRequest } from "@/modules/redux/ducks/login";
import { showModal } from "@/modules/redux/ducks/modal";
import { getAuthorMineFromServer } from "@/services/postService";
import { clearUserData } from "@/utils/localStorageUtil";
import moment from "moment";
import { useSelector } from "react-redux";
import { RESULT_CODE_LIST } from "./constant";
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
  return ref.current.checked ? "R-18" : "G";
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
* @param data api response
* @return 에러메세지
*/
export const getErrorMessageFromResultCode = (data) => {
  let returnMessage = "Error";

  for (let i = 0; i < RESULT_CODE_LIST.length; i++) {
    if (RESULT_CODE_LIST[i].code === data?.result) {
      returnMessage = RESULT_CODE_LIST[i].name + " " + data?.message;
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
  if (date === undefined || date === null) {
    return "";
  }
  return moment(date).format(["YYYY", "MM", "DD"].join(separator));
};

/**
*
  input에 숫자만
*
* @version 1.0.0
* @author 2hyunkook
*/
export const setInputValueToNumber = (ref, value) => {
  ref.current.value = value.replace(/[^0-9]/g, "");
};

/**
  에디터가 필요한 type 인지 체크 
* @version 1.0.0
* @author 2hyunkook
*/
export const getShowEditor = (type) => {
  return type?.code === undefined || type?.code === 'novel' || type?.code === 'illust' || type?.code === 'blog' || type?.code === 'photo' || type?.code === 'music';
};

/**
  login token 이 expried 되었는지 확인
* @version 1.0.0
* @author 2hyunkook
*/
export const checkLoginExpired = (navigate, dispatch, text, loginTime) => {
  if( loginTime !== undefined && loginTime !== null ){
    //1일이 지나면 token 이 expired
    const loginMoment = moment(loginTime);
    const afterTime = loginMoment.clone().add(1, 'days');
    const nowTime = moment();

    if( nowTime.isAfter(afterTime) ){
      clearUserData();
      dispatch( logoutRequest() );
      showOneButtonPopup(dispatch, text, () => navigate('/account'));
      return false;
    }
    else{
      return true;
    }
  }
  else{
    return false;
  }
};

/**
*
  lottie 적용된 button 상태 초기화
*
* @version 1.0.0
* @author 2hyunkook
*/
export const initButtonInStatus = (refButton) => {
  refButton.current.setStatus(undefined);
};

/**
  show error popup 
* @version 1.0.0
* @author 2hyunkook
* @param dispatch useDispatch 객체
* @param message error message string
* @param callback popup이 사라질때 callback
*/
export const showOneButtonPopup = (dispatch, message, callback) => {
  dispatch(
    showModal({
      title: "お知らせ",
      contents: <ErrorPopup message={message} buttonTitle={"確認"} />,
      callback: callback,
    })
  );
};

/**
  버블링 방지
* @version 1.0.0
* @author 2hyunkook
*/
export  const handleClickStopPropagation = (e, onClick) => {
  e.stopPropagation();
  onClick?.(e);
};

/**
  show confirm popup 
* @version 1.0.0
* @author 2hyunkook
* @param dispatch useDispatch 객체
* @param message error message string
* @param confirmCallback 확인 버튼 callback
* @param callback popup이 사라질때 callback
*/
export const showTwoButtonPopup = (
  dispatch,
  message,
  confirmCallback,
  callback
) => {
  dispatch(
    showModal({
      title: "お知らせ",
      contents: (
        <ConfirmPopup
          message={message}
          buttonTitle={"確認"}
          callback={confirmCallback}
        />
      ),
      callback: callback,
    })
  );
};

/**
  천마다 콤마
* @version 1.0.0
* @author 2hyunkook
* @param number 
*/
export const convertMoneyStyleString = (number) => {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * 축약
 * @version 1.0.0
 * @author 조장혁
 * @param {number} num
 */
export const convertContraction = (num) => {
  if (num > 1000) {
    let tempNum = 0;
    let unit = "";
    if (num > 1000000000000) {
      // 1조
      tempNum = num / 1000000000000;
      unit = "t";
    } else if (num > 1000000000) {
      // 10억
      tempNum = num / 1000000000;
      unit = "b";
    } else if (num > 1000000) {
      // 100만
      tempNum = num / 1000000;
      unit = "m";
    } else {
      // 1000
      tempNum = num / 1000;
      unit = "k";
    }
    return `${tempNum.toFixed(1) * 1}${unit}`;
  } else {
    return num;
  }
};

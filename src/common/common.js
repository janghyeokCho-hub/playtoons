import ConfirmPopup from "@/components/dashboard/ConfirmPopup";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import { logoutRequest } from "@/modules/redux/ducks/login";
import { showModal } from "@/modules/redux/ducks/modal";
import { clearUserData } from "@/utils/localStorageUtil";
import moment from "moment";
import { MOMENT_DATE_FORMAT, MOMENT_DATE_TIME_FORMAT, RESULT_CODE_LIST, UNIT_EMONEY } from "./constant";
import parse from "html-react-parser";
import Image from "@/components/dashboard/Image";
import { setNovelAction, setWebtoonAction } from "@/modules/redux/ducks/post";
import { useTranslation } from "react-i18next";
import { showToastAction } from "@/modules/redux/ducks/toast";
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
   get request를 위해서 params로 url 생성
* @version 1.0.0
* @author 2hyunkook
* @param formData formData 객체
* @return url get method에서 사용할 url
*/
export const getStringForUrl = (formData) => {
  let url = "?";

  if (formData !== undefined) {
    for (const item of formData.entries()) {
      url += `${item[0]}=${item[1]}&`;
    }
  }

  return url.slice(0, -1);
};

/**
   form 태그 안의 값을 json object 로 반환해준다.
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
   list 에서 value 를 제거해준다.
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
   R-19 check 를 확인해서 code 값 리턴
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
   response 의 result code로 에러메세지를 리턴받는다.
* @version 1.0.0
* @author 2hyunkook
* @param data api response
* @return 에러메세지
*/
export const getErrorMessageFromResultCode = (data) => {
  let returnMessage = `Error${data?.message ? " : " + data?.message : ""}`;

  for (let i = 0; i < RESULT_CODE_LIST.length; i++) {
    if (RESULT_CODE_LIST[i].code === data?.result) {
      returnMessage = `${RESULT_CODE_LIST[i].name}${
        data?.message ? " : " + data?.message : ""
      }`;
      break;
    }
  }

  return returnMessage;
};

/**
   date format
* @version 1.0.0
* @author 2hyunkook
* @param date date 정보
* @param separator 구분자
*/
export const getDateYYYYMMDD = (date) => {
  if (date === undefined || date === null) {
    return "";
  }
  return moment(date).format(MOMENT_DATE_FORMAT);
};
/**
   date format
* @version 1.0.0
* @author 2hyunkook
* @param date date 정보
* @param separator 구분자
*/
export const getDateYYYYMMDDHHmm = (date) => {
  if (date === undefined || date === null) {
    return "";
  }
  return moment(date).format(MOMENT_DATE_TIME_FORMAT);
};

/**
   date format
* @version 1.0.0
* @author 2hyunkook
* @param date date 객체
* @param format date format string
*/
export const getFormattedDateForUrl = (date, format) => {
  if( date ){
    return format.replace(/(yyyy|yy|MM|dd|HH|mm|ss)/gi, function($1) {
      switch ($1) {
          case "yyyy": return date.getFullYear();
          case "yy": return String(date.getFullYear() % 1000).padStart(2, '0');
          case "MM": return String(date.getMonth() + 1).padStart(2, '0');
          case "dd": return String(date.getDate()).padStart(2, '0');
          case "HH": return String(date.getHours()).padStart(2, '0');
          case "mm": return String(date.getMinutes()).padStart(2, '0');
          case "ss": return String(date.getSeconds()).padStart(2, '0');
          default: return $1;
      }
    });
  }
};

/**
   date 객체 생성을 위한 formatted 된 string 구하기
* @version 1.0.0
* @author 2hyunkook
* @param date date string
* @return date object
*/
export const getFormattedDateForDateObject = (date) => {
  return new Date( date.replace(/(\d{4})(\d{2})(\d{2})$/, `$1/$2/$3`) );
};

/**
   date picker에서 사용되는 초기 date 객체를 구해온다. 
* @version 1.0.0
* @author 2hyunkook
* @param type now, 3month, 1month, 1week, 1day
* @return
*/
export const getInitDateObject = (type) => {
  const now = new Date();
  if (type === "now") {
    return now;
  } else if (type === "3month") {
    return new Date(now.setMonth(now.getMonth() - 3));
  } else if (type === "1month") {
    return new Date(now.setMonth(now.getMonth() - 1));
  } else if (type === "1week") {
    return new Date(now.setDate(now.getDate() - 7));
  } else if (type === "1day") {
    return new Date(now.setDate(now.getDate() - 1));
  }

  //none
  return undefined;
};

/**
   html string 을 html 태그로 변환
* @version 1.0.0
* @author 2hyunkook
*/
export const getHtmlElementFromHtmlString = (content) => {
  if (content) {
    return parse(content);
  }
};

/**
  input에 숫자만
* @version 1.0.0
* @author 2hyunkook
*/
export const setInputValueToNumber = (ref, value) => {
  ref.current.value = value.replace(/[^0-9]/g, "");
};

/**
   convet file object to binay
* @version 1.0.0
* @author 2hyunkook
*/
export const getFileDataUrl = async (file) => {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });
};

/**
   convet file object list to binay list
* @version 1.0.0
* @author 2hyunkook
*/
export const getFileDataUrlList = async (files) => {
  return await Promise.all(
    files.map(async (file) => {
      return await getFileDataUrl(file);
    })
  );
};
/**
   convet file object list to binay list
* @version 1.0.0
* @author 2hyunkook
*/
export const isArrayFromPostContent = (content) => {
  return content.includes(",");
};

/**
   post 이미지, 배열 이미지를 가져온다. 
* @version 1.0.0
* @author 2hyunkook
* @return image 객체
*/
export const getContentOfPost = (content) => {
  if (isArrayFromPostContent(content)) {
    return content.split(",").map((item, index) => {
      return <Image hash={item} alt="" key={index} />;
    });
  } else {
    return <Image hash={content} alt="" />;
  }
};

/**
  status 
* @version 1.0.0
* @author 2hyunkook
*/
export const getStatusText = (status, text) => {
  switch (
    status //enabled, disabled, pending, suspended(사용자가 설정 못함)
  ) {
    default:
      return "連載中";
    // return text.enabled;
    case "disabled":
      return text.disabled;
  }
};

/**
  reaction date 
* @version 1.0.0
* @author 2hyunkook
*/
export const getReactionDate = (date, t) => {
  const now = moment();
  const createdAt = moment(date);
  const year = moment.duration(now.diff(createdAt)).asYears();
  const month = moment.duration(now.diff(createdAt)).asMonths();
  const day = moment.duration(now.diff(createdAt)).asDays();
  const hour = moment.duration(now.diff(createdAt)).asHours();
  const minute = moment.duration(now.diff(createdAt)).asMinutes();
  const second = moment.duration(now.diff(createdAt)).asSeconds();
  
  if (year > 1) {
    return parseInt(year) + t(`before_year`);
  } else if (month > 1) {
    return parseInt(month) + t(`before_month`);
  } else if (day > 1) {
    return parseInt(day) + t(`before_day`);
  } else if (hour > 1) {
    return parseInt(hour) + t(`before_hour`);
  } else if (minute > 1) {
    return parseInt(minute) + t(`before_minute`);
  }

  return parseInt(second) + t(`before_second`);
};

/**
  에디터가 필요한 type 인지 체크 
* @version 1.0.0
* @author 2hyunkook
*/
export const getShowEditor = (type) => {
  return (
    type?.code === undefined ||
    type?.code === "novel" ||
    type?.code === "illust" ||
    type?.code === "blog" ||
    type?.code === "photo" ||
    type?.code === "music"
  );
};

/**
  login token 이 expried 되었는지 확인
* @version 1.0.0
* @author 2hyunkook
*/
export const checkLoginExpired = (navigate, dispatch, text, loginTime) => {
  if (loginTime !== undefined && loginTime !== null) {
    //1일이 지나면 token 이 expired
    const loginMoment = moment(loginTime);
    const afterTime = loginMoment.clone().add(1, "days");
    const nowTime = moment();

    if (nowTime.isAfter(afterTime)) {
      clearUserData();
      dispatch(logoutRequest());
      showOneButtonPopup(dispatch, text, () => navigate("/account"));
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

/**
  webtoon page 검색 조건을 저장
* @version 1.0.0
* @author 2hyunkook
* @param type     menu type 'EVERY, SERIES, COMPLETED, SHORT'
* @param page     page number
* @param orderBy  order by  'recent, recommend, rank'
* @param tags     search tags
* @param search   search text
*/
export const setReduxOfWebtoon = (
  dispatch,
  type,
  page,
  orderBy,
  tags,
  search
) => {
  dispatch(
    setWebtoonAction({
      type: type,
      page: page,
      orderKey: orderBy,
      tags: tags,
      keyword: search,
    })
  );
};

/**
  novel page 검색 조건을 저장
* @version 1.0.0
* @author 2hyunkook
* @param type     menu type 'EVERY, SERIES, COMPLETED, SHORT'
* @param page     page number
* @param orderBy  order by  'recent, recommend, rank'
* @param tags     search tags
* @param search   search text
*/
export const setReduxOfNovel = (dispatch, params) => {
  dispatch(
    setNovelAction({
      type: params?.type || "EVERY",
      page: params?.page || 1,
      orderKey: params?.orderKey || "recent",
      tags: params?.tags || [],
      keyword: params?.keyword || "",
    })
  );
};

/**
  lottie 적용된 button 상태 초기화
* @version 1.0.0
* @author 2hyunkook
*/
export const initButtonInStatus = (refButton) => {
  refButton.current.setStatus(undefined);
};

/**
  show  toast 
* @version 1.0.0
* @author 2hyunkook
* @param type success, error, info
* @param message 
* @param isShow show flag
*/
export const showToast = (dispatch, type, message, isShow) => {
  dispatch(
    showToastAction({
      type: type,
      message: message,
      show: isShow,
    })
  );
};
/**
  show  popup 
* @version 1.0.0
* @author 2hyunkook
* @param dispatch useDispatch 객체
* @param title title string
* @param contents 
* @param callback popup이 사라질때 callback
*/
export const showPopup = (dispatch, title, contents, callback, className) => {
  dispatch(
    showModal({
      title: title,
      contents: contents,
      callback: callback,
      className: className,
    })
  );
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
export const handleClickStopPropagation = (e, onClick) => {
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
  callback,
  title = "お知らせ", 
  buttonText = "確認",
) => {
  dispatch(
    showModal({
      title: title,
      contents: (
        <ConfirmPopup
          message={message}
          buttonTitle={buttonText}
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
  숫자를 play coin 으로 변환
* @version 1.0.0
* @author 2hyunkook
* @param price 
*/
export const getStringOfPlaycoin = (price) => {
  if( Number.isNaN(Number(price)) || price === null || price === undefined ){
    return `0${UNIT_EMONEY}`;
  }
  
  return `${convertMoneyStyleString( Number.parseInt(price) )}${UNIT_EMONEY}`;
};
/**
  currency 위치 
* @version 1.0.0
* @author 2hyunkook
* @param i18n
* @returns true 뒤  
*/
export const getCurrencyPosition = (i18n) => {
  return i18n.language === "ja-JP" || i18n.language === "ko-KR"; // || i18n.language === "zh-CN";
}
/**
  숫자를 play coin 으로 변환
* @version 1.0.0
* @author 2hyunkook
* @param price 
*/
export const getStringOfPriceWithCurrency = (price, t, i18n) => {
  const currency = t("currency");

  if( Number.isNaN(Number(price)) || price === null || price === undefined ){
    if( getCurrencyPosition(i18n) ){
      return `0${currency}`;
    } else {
      return `${currency}0`;
    }
  }
  
  if( getCurrencyPosition(i18n) ){
    return `${convertMoneyStyleString( Number.parseInt(price) )}${currency}`;
  } else {
    return `${currency}${convertMoneyStyleString(price)}`;
  }
};

/**
 * Convert a number to its contraction form (e.g. 1000 -> 1k).
 *
 * @param {number} num - The number to convert.
 * @returns {string|number} The contraction form of the number, or the original number if it is not greater than 1000.
 */
export function convertContraction(num) {
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
}

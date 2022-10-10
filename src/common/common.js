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
 * Get Access Token
 * @returns
 */
export const getToken = () => {
  const rootData = localStorage.getItem("persist:root");
  const rootJSON = isJSONStr(rootData) ? JSON.parse(rootData) : rootData;
  const loginData = rootJSON.login;
  const loginJSON = isJSONStr(loginData) ? JSON.parse(loginData) : loginData;
  return loginJSON.token;
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

  for (const item of formData.entries()) {
    url += `${item[0]}=${item[1]}&`;
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

export const openLayerPopup = (id) => {
  console.log(id);
  console.log("window.innerWidth : ", window.innerWidth);
  console.log("window.outerWidth : ", window.outerWidth);

  /*var $obj = $("#" +id);
	var $winH = $(window).width();
	
	$(".layerPopup").hide();
	$("#" +id).fadeIn(300);
	$("#" +id).before("<div class='popup_dim'></div>");


	$(".b-close, .popup_dim").on("click", function(){
		$obj.fadeOut(100);
		$(".popup_dim").remove();
	});*/
};

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
export const getValueOrDefault = ( value, d ) => {
  return value === undefined ? d : value;
};
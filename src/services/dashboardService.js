import { apiServer } from "./api";

/**
*
  call dashboard -> シリーズリスト 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getSeriesStoryList = () => {
  return apiServer("get", "/post/series");
};

/**
*
  call type list ex) 만화, 소설등  
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getPostTypeList = () => {
  return apiServer("get", "/post/type");
};

/**
*
  파일 저장 
*
* @version 1.0.0
* @author 2hyunkook
* @return hash : [get] /file/{hash} api로 파일 경로 가져옴
*/
export const setFileToServer = (params) => {
  const header = {
    "content-type": "multipart/form-data",
  };

  return apiServer("post", "/file", params, header);
};

/**
*
   파일 경로 불러오기 
*
* @version 1.0.0
* @author 2hyunkook
* @return 파일경로
*/
export const getFileFromServer = (hash, params) => {
  let parameters = "";
  if( params !== undefined ){
    parameters = "?" + new URLSearchParams(params).toString();
  }
  return apiServer("get", `/file/${hash}${parameters}`);
};

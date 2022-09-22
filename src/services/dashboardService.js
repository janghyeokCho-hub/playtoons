import { apiServer } from "./api";

/**
*
  call dashboard -> シリーズリスト 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getSeriesStoryList = (params) => {
  return apiServer("get", "/post/series", params);
};

/**
*
  call type list ex) 만화, 소설등  
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getPostTypeListFromServer = () => {
  return apiServer("get", "/post/type");
};

/**
*
   타입 별 카테고리 목록
*
* @version 1.0.0
* @author 2hyunkook
* @param typeId type id
*/
export const getPostCategoryListFromServer = (typeId) => {
  return apiServer("get", `/post/category/${typeId}`);
};

/**
*
  파일 저장 
*
* @version 1.0.0
* @author 2hyunkook
* @parma  const params = new FormData();
          params.append("authorId", "");               
          params.append("subscribeTierId", "");        
          params.append("productId", "");
          params.append("type", "image");                 //image, video, binary
          params.append("usage", "cover");                //profile, background, cover, logo, post, product, thumbnail, attachment
          params.append("loginRequired", true);
          params.append("licenseRequired", false);        //product 에 관련된 항목 추후 확인 필요
          params.append("rating", "G");                   //G, PG-13, R-15, R-17, R-18, R-18G
          params.append("file", file);
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


/**
*
  call dashboard -> 投稿リスト
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getPostListFromServer = (params) => {
  return apiServer("get", "/post", params);
};

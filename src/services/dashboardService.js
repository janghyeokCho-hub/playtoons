import { getGetMethodUrl } from "@/common/common";
import { apiServer } from "./api";

/**
*
  call dashboard -> シリーズリスト 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getSeriesStoryList = async (params) => {
  try {
    return await apiServer("get", "/post/series" + getGetMethodUrl(params));
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  call type list ex) 만화, 소설등  
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getPostTypeListFromServer = async () => {
  try {
    return await apiServer("get", "/post/type");
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
   타입 별 카테고리 목록
*
* @version 1.0.0
* @author 2hyunkook
* @param typeId type id
*/
export const getPostCategoryListFromServer = async (typeId) => {
  try {
    return await apiServer("get", `/post/category/${typeId}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
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
export const setFileToServer = async (params) => {
  const header = {
    "content-type": "multipart/form-data",
  };

  try {
    return await apiServer("post", "/file", params, header);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};


/**
*
   파일 경로 불러오기 
*
* @version 1.0.0
* @author 2hyunkook
* @return 파일경로
*/
export const getFileUrlFromServer = async (hash, params) => {
  let parameters = "";
  if( params !== undefined ){
    parameters = `?${getGetMethodUrl(params)}`;
  }

  try {
    return await apiServer("get", `/file/${hash}${parameters}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};


/**
*
  call dashboard -> 投稿リスト
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getPostListFromServer = async (params) => {
  try {
    return await apiServer("get", "/post" + getGetMethodUrl(params));
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};


/**
*
  태그 검색
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getTagFromServer = async (query, params) => {
  try {
    return await apiServer("get", `/tag/${query}${getGetMethodUrl(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};


/**
*
  태그 작성
*
* @version 1.0.0
* @author 2hyunkook
* @return json
*/
export const setTagToServer = async (params) => {
  try {
    return await apiServer("post", "/tag", params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  Dashbaord - series 시리즈 작성
*
* @version 1.0.0
* @author 2hyunkook
*/
export const setSeriesToServer = async (params) => {
  try {
    return await apiServer("post", "/post/series", params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  Dashbaord - series - detail 시리즈 상세
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getSeriesDetailFromServer = async (params) => {
  try {
    return await apiServer("get", `/post/series/${params.id}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  Dashbaord - profile 작가 정보 업데이트
*
* @version 1.0.0
* @author 2hyunkook
*/
export const setAuthorToServer = async (params) => {
  try {
    return await apiServer('post', `/author`, params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};
/**
*
  Dashbaord - profile 작가 정보 업데이트
*
* @version 1.0.0
* @author 2hyunkook
*/
export const setAuthorIdToServer = async (id, params) => {
  try {
    return await apiServer('patch', `/author/${id}`, params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  Dashbaord - profile 작가 정보 가져오기
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getAuthorIdFromServer = async (params) => {
  try {
    return await apiServer('get', `/author/${params.id}`, );
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};



/**
*
  Dashbaord - plan 플랜 관리 목록 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getSubscribeTierAuthorIdFromServer = async (params) => {
  try {
    return await apiServer('get', `/subscribeTier/${params.authorId}`, );
    // return await apiServer('get', `/subscribeTier/${params.authorId}${getGetMethodUrl(params)}`, );
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  Dashbaord - plan 플랜 관리 목록 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const setSubscribeTierToServer = async (params) => {
  try {
    return await apiServer('post', `/subscribeTier`, params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  Dashbaord - plan 플랜 수정 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const editSubscribeTierToServer = async (params) => {
  try {
    return await apiServer('patch', `/subscribeTier`, params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  Dashbaord - series 수정 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const editPostSeriesToServer = async (params) => {
  try {
    return await apiServer('patch', `/post/series`, params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  Dashbaord - reaction list 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getReactionMineAuthorIdFromServer = async (params) => {
  try {
    return await apiServer('get', `/reaction/mine/${getGetMethodUrl(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  Dashbaord - reaction list - 고정
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getReactionReactionIdPinFromServer = async (params) => {
  try {
    return await apiServer('post', `/reaction/${params.id}/pin`, );
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  Dashbaord - reaction list - 고정취소
*
* @version 1.0.0
* @author 2hyunkook
*/
export const deleteReactionReactionIdPinFromServer = async (params) => {
  try {
    return await apiServer('delete', `/reaction/${params.id}/pin`, );
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  Dashbaord - post - detail - reaction list
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getReactionFromServer = async (params) => {
  try {
    return await apiServer('get', `/reaction${getGetMethodUrl(params)}`, );
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};





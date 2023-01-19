import { getFileUrlFromServer } from "@/services/dashboardService";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

/**
*
  hash값으로 이미지 url을 가져와서 span 태그에 뿌려줌.
   <ImageBackgroundSpan 
    className={"series_image"}
    hash={item.coverImage} 
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param className class name
* @param hash server에서 얻어온 hash
*/
export default function ImageBackgroundSpan(props) {
  const { hash, className = "" } = props;
  const [stateImage, setStateImage] = useState(undefined);
  const [stateError, setStateError] = useState("");

  const getImage = async (hash) => {
    const params = new FormData();
    const { status, data } = await getFileUrlFromServer(hash, params);

    if (status === 200) {
      setStateImage(data?.url);
    } else {
      setStateError(" error");
    }
  };

  useEffect(() => {
    if( hash ){
      if ( hash?.startsWith("/static/media/") || hash?.startsWith("data:image")) {
        setStateImage(hash);
      } else {
        getImage(hash);
      }
    }
  }, [hash]);

  return <span className={`${className}${stateError}`} style={{backgroundImage: `url(${stateImage})`}}></span>
}

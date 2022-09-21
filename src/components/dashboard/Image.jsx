import { getFileFromServer } from '@/services/dashboardService';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import tempImage from '@IMAGES/tmp_comic2.jpg';

/**
*
   <Image 
    className={"series_image"}
    hash={item.coverImage} 
    alt={"cover iamge"} />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function Image(props) {
  const {alt, hash, className} = props;
  const [image , setImage] = useState(undefined);

  const getImage = async (hash) => {
    if( hash === null || hash === undefined ){
      setImage(tempImage);
      return;
    }

    const params = new FormData();
    const {status, data: result} = await getFileFromServer(hash, params);
    console.log('getImage', status, result);
    
    if( status === 200 ){
      setImage(result?.url);
    }
    else{
      console.log("error ", result?.message);
    }
    
  };

  useEffect(() => {
    getImage(hash);
  }, []);

  return (
    <img className={className} src={image} alt={alt} />
  )
}

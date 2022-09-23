import React from 'react';
import Header from '@/components/Header';

/**
*
  <PostContainer
      type={"series"}
      headerType={"post"}
      >
      .....
  </PostContainer>
*
* @version 1.0.0
* @author 2hyunkook
* @param type dashboard, series 등 container div 스타일
* @param backTitle back button text
* @return
*/
export default function PostContainer(props) {
  const {type, headerType, headerClassName,  children} = props;

  return (
    <div id="wrap">
      <Header 
        type={headerType}
        className={headerClassName}
        />

      <div id="container" className={`container ${type}`}>

        {children}
      </div>
    </div>
  )
}

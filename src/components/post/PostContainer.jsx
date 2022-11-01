import React from 'react';
import Header from '@/components/Header';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorMineAction } from '@/modules/redux/ducks/post';
import { useState } from 'react';
import useActions from '@/hook/useActions';
import { finishLoading } from '@/modules/redux/ducks/loading';

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
  const {className, headerType, headerClassName,  children} = props;
  const reduxAuthors = useSelector(({post}) => post.authorMine?.authors);
  const reduxLoading = useSelector(({loading}) => loading);
  const dispatch = useDispatch();
  
  // finishLoading

  useLayoutEffect(() => {
    dispatch( getAuthorMineAction() );
  }, []);

  useLayoutEffect(() => {
    console.log('first', reduxLoading === false);
  }, [dispatch, reduxLoading]);

  return (
    <>
      <Header 
        type={headerType}
        isDetailView={true}
        className={headerClassName}
        />

      <div id="container" className={`container ${className}`}>

        {
          children
        }
      </div>
    </>
  );
}

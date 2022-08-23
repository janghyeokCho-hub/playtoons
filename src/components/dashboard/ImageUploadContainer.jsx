import React, {useCallback, useState, useEffect, useLayoutEffect} from 'react';
import styled from "styled-components";
import {  Body3, Border1pxTiara } from "@/styledMixins";
import {useDropzone} from 'react-dropzone'

import iconAdd from '@IMAGES/icons/icon_add.png';

import ImagePreviewContainer from '@COMPONENTS/dashboard/ImagePreviewContainer';

export default function MyDropzone(props) {
  const { children : data, className, textDragNDrop, handleFile } = props;
  const [file, setFile] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    setFile(acceptedFiles[0]);

    if( handleFile !== undefined ){ handleFile(acceptedFiles[0]); }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const InputProps = {
    ...getInputProps(),
    multiple: false,
    accept: "image/gif, image/jpg, image/jpeg, image/png",
    type: "file"
  };

  const RootProps = {
    ...getRootProps(),
  };

  const handlePreviewClose = () => {
    setFile(undefined);
    console.log("handlePreviewClose "+className, file)
  }

  useLayoutEffect(() => {
    setFile(data);
    console.log("useLayoutEffect "+className, file)
  
    return () => {
    };
  }, []);

  useEffect(() => {
    console.log("useEffect "+className, file)
  
    return () => {
    }
  }, []);

  return (
    <>
        <input {...InputProps}/>
        {
          file === undefined ? (
            <Container {...RootProps} maxSize={100} multiple={false} className={`${className || ""} `}>
              {  isDragActive ? (
                <TextContainer>
                  <TextlabelDragNDrop>{"이미지를 놓아주세요."}</TextlabelDragNDrop>
                </TextContainer>
                ) : (
                  <TextContainer>
                    <TextAlignContainer>
                      <IconAddPostimage />
                      <TextlabelDragNDrop className={`${className || ""}`}>{textDragNDrop}</TextlabelDragNDrop>
                    </TextAlignContainer>
                  </TextContainer>
                )
              }
            </Container>
          ) : (
            <Container className={`${className || ""} preview`}>
              <ImagePreviewContainer handleClick={handlePreviewClose}>{file}</ImagePreviewContainer>
            </Container>
          )
        }
    </>
  );
}

const Container = styled.div`
  ${Border1pxTiara}
  position: absolute;
  width: 220px;
  height: 300px;
  top: 1099px;
  left: 746px;
  background-color: var(--desert-storm);
  border-radius: 4px;

  &.dashboard_upload_timeline{
    width: 699px;
    top: 1463px;
    left: 746px;
    }
  &.preview{
    background-color: transparent;
    border-radius: 0px;
    border: 0px;
  }
`;

const TextContainer = styled.div `
  width: 100%;
  height: 300px;
  position: relative;
`;

const TextlabelDragNDrop = styled.div `
  ${Body3}
  position: relative;
  width: 100%;
  height: auto;
  margin-top: 10px;
  overflow: hidden;
  color: var(--deep-space-sparkle);
  white-space: nowrap;
  text-align: center;
  
  &.dashboard_upload_timeline{
    /* line-height: 360px; */
  }
`;

const TextAlignContainer = styled.div`
  width: 100%;
  height: 300px;
  position: absolute;
  top: 40%;
`;

const IconAddPostimage = styled.div`
  position: static;
  width: 24px;
  height: 24px;
  margin: auto;
  background-size: 100% 100%;
  background-image: url(${iconAdd});
`;

import React, {useCallback, useState, useEffect, useLayoutEffect} from 'react';
import styled from "styled-components";
import {  Body3, Border1pxTiara } from "@/styledMixins";
import {useDropzone} from 'react-dropzone'

import iconAdd from '@IMAGES/icons/icon_add.png';

import ImagePreviewContainer from '@COMPONENTS/dashboard/ImagePreviewContainer';

export default function ImageUploadContainer(props) {
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
  }

  useLayoutEffect(() => {
    setFile(data);
  
  }, []);

  useEffect(() => {
  
  }, []);

  return (
    <RootContainer {...props}>
        <input {...InputProps}/>
        {
          file === undefined ? (
            <Container {...RootProps} maxSize={100} multiple={false} {...props}>
              {  isDragActive ? (
                <TextContainer>
                  <TextlabelDragNDrop>{props.textInputMessage}</TextlabelDragNDrop>
                </TextContainer>
                ) : (
                  <TextContainer>
                    <IconAddPostimage />
                    <TextlabelDragNDrop className={`${className || ""}`}>{textDragNDrop}</TextlabelDragNDrop>
                  </TextContainer>
                )
              }
            </Container>
          ) : (
            <Container {...props}>
              <ImagePreviewContainer handleClick={handlePreviewClose}>{file}</ImagePreviewContainer>
            </Container>
          )
        }
    </RootContainer>
  );
}

const RootContainer = styled.div`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-bottom: ${(props) => props.marginBottom};
`;

const Container = styled.div`
  ${Border1pxTiara}
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: var(--desert-storm);
  border-radius: 4px;

  &.preview{
    background-color: transparent;
    border-radius: 0px;
    border: 0px;
  }
`;

const TextContainer = styled.div `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
`;

const TextlabelDragNDrop = styled.div `
  ${Body3}
  width: 100%;
  height: auto;
  color: var(--deep-space-sparkle);
  white-space: nowrap;
  text-align: center;
  
  &.dashboard_upload_timeline{
    /* line-height: 360px; */
  }
`;


const IconAddPostimage = styled.div`
  width: 24px;
  height: 24px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.111111111vh;
  background-size: 100% 100%;
  background-image: url(${iconAdd});
`;

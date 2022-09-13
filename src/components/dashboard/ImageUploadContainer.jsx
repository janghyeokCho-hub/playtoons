import React, { useCallback, useState, useEffect } from 'react';
import styled from "styled-components";
import {  Body3, Border1pxTiara } from "@/styledMixins";
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/pro-solid-svg-icons";

import ImagePreviewContainer from '@COMPONENTS/dashboard/ImagePreviewContainer';

/**
 * 
  <ImageUploadBox
    width={"699px"}
    height={"300px"}
    border={"1px dashed var(--tiara)"}
    textDragNDrop={text.label_drag_drop}
    textInputMessage={text.input_image}
    handleFile={handleTimelineImageFile}
    />
  
 * @param {*} props 
 * @returns 
 */
export default function ImageUploadContainer(props) {
  const { children, textDragNDrop, handleFile } = props;
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

  useEffect(() => {
    setFile(children);
  }, []);

  return (
    <RootContainer 
      width={props.width}
      height={props.height}
      marginBottom={props.marginBottom}
      >
      <input {...InputProps}/>
      {
        file === undefined ? (
          <Container 
            {...RootProps} 
            maxSize={100} 
            multiple={false} 
            width={props.width}
            height={props.height}
            border={props.border}
            backgroundColor={props.backgroundColor}
            >
              {  isDragActive ? (
                <TextContainer>
                  <TextlabelDragNDrop>{props.textInputMessage}</TextlabelDragNDrop>
                </TextContainer>
                ) : (
                  <TextContainer>
                    <FontAwesomeIcon 
                      icon={faCirclePlus}
                      style={{ 
                        width: "24px", 
                        height: "24px", 
                        marginBottom: `${props.textDragNDrop ? "12px" : ""}`,
                        color: "var(--deep-space-sparkle)" 
                      }}
                      />
                    <TextlabelDragNDrop >{textDragNDrop}</TextlabelDragNDrop>
                  </TextContainer>
                )
              }
          </Container>
        ) : (
          <PreviewContainer 
            width={props.width}
            height={props.height}
            >
            <ImagePreviewContainer handleClick={handlePreviewClose}>{file}</ImagePreviewContainer>
          </PreviewContainer>
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

const PreviewContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 5px;
  border: 2px solid rgba(57,75,194, 1);
  opacity: 1;
  background-color: rgba(247,248,249, 1);
  background-size: 100%;
`;

const Container = styled.div`
  ${Border1pxTiara}
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};      //var(--desert-storm)
  border-radius: 4px;
  border: ${(props) => props.border};                         //1px dashed var(--tiara)
  opacity: 1;
  
Rectangle
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
  text-align: center;
`;

const TextlabelDragNDrop = styled.div `
  ${Body3}
  width: 100%;
  height: auto;
  color: var(--deep-space-sparkle);
  white-space: nowrap;
  text-align: center;
`;


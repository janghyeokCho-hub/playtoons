import React, { useState, useEffect, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import styled from "styled-components";
import {  Body3 } from "@/styledMixins";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/pro-solid-svg-icons";

import ImagePreviewContainer from '@COMPONENTS/dashboard/ImagePreviewContainer';

/**
 * 
  <ProfileUploadContainer
    width={"699px"}
    height={"300px"}
    textInputMessage={text.input_image}
    handleFile={handleTimelineImageFile}
    />
  
 * @param {*} props 
 * @returns 
 */
export default function ProfileUploadContainer(props) {
  const { children , handleFile } = props;
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
      <Input {...InputProps}/>
      {
        file === undefined ? (
          // upload
          <Container 
            {...RootProps} 
            {...props}
            maxSize={100} 
            multiple={false} 
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
                          color: "var(--deep-space-sparkle)" 
                        }}
                        />
                    </TextContainer>
                )
              }
          </Container>
        ) : (
          // preview
          <PreviewContainer 
            width={props.width}
            height={props.height}
            borderRadius={props.borderRadius}
            >
            <ImagePreviewContainer 
              borderRadius={props.borderRadius}
              handleClick={handlePreviewClose}
              >
              {file}
            </ImagePreviewContainer>
          </PreviewContainer>
        )
      }
    </RootContainer>
  );
}

const Input = styled.input`
  display: none;
`;

const RootContainer = styled.div`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-bottom: ${(props) => props.marginBottom};
`;


const PreviewContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  background-color: rgba(247,248,249, 1);
  background-size: 100%;
  border: 2px solid rgba(57,75,194, 1);
  opacity: 1;
`;


const Container = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => props.border};
  background-color: var(--tiara);
  opacity: 1;
  

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


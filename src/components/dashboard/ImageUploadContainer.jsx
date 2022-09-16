import React, { useCallback, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import styled from "styled-components";
import {  Body3, Border1pxTiara } from "@/styledMixins";
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/pro-solid-svg-icons";

import ImagePreviewContainer from '@COMPONENTS/dashboard/ImagePreviewContainer';

/**
 * 
 * 이미지 파일 drag n drop, preivew 컴포넌트 
  <ImageUploadBox
    ref={refCoverImage}
    width={"699px"}
    height={"300px"}
    border={"1px dashed var(--tiara)"}
    name={"coverImage"}                     //parameter name
    textDragNDrop={text.label_drag_drop}    //label 
    textInputMessage={text.input_image}     //drag 중 text
    />
  
  ex) 이미지 파일 정보 가져오기 file, preview, hash
    refCoverImage.current.getImageFile();
  ex) hash 정보 input에 넣기 
    refCoverImage.current.setImageHash(hash);
 * @version 1.0.0
 * @author 2hyunkook
 * @param {*} props 
 */
function ImageUploadContainer(props, ref) {
  const initImageObject = {file: undefined, preview: undefined, hash: undefined};
  const { children, textDragNDrop, name } = props;
  const [image, setImageFile] = useState(initImageObject);

  
  /**
  *
     업로드 전 preview 생성
  *
  * @version 1.0.0
  * @author 2hyunkook
  * @param {*} file
  */
  const setPreviewImage = (file) => {
    const reader = new FileReader();

    if(file){
      reader.readAsDataURL(file);
    }
    
    reader.onload = () => {
      setImageFile({
        ...image,
        file: file,
        preview: reader.result
      });
    };
  };

  //=============== file drag n drop 설정 ===============
  const onDrop = useCallback(async (acceptedFiles) => {
    setPreviewImage(acceptedFiles[0]);
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
  //===============  ===============
  
  const handlePreviewClose = () => {
    setImageFile(initImageObject);
  };

  useImperativeHandle(ref, () => ({
    setImageHash: (hash) => {
      setImageFile({...image, hash: hash});
    },
    getImageFile: () => {
      return image;
    }
  }));

  useEffect(() => {
    setImageFile({
      ...image,
      preview : children
    });
  }, [children]);

  return (
    <RootContainer 
      width={props.width}
      height={props.height}
      marginBottom={props.marginBottom} >
      <input type={"text"} name={name} defaultValue={image?.hash} style={{display: "none"}} />
      <input {...InputProps}/>
      {
        image?.preview === undefined ? (
          <Container 
            {...RootProps} 
            maxSize={100} 
            multiple={false} 
            width={props.width}
            height={props.height}
            border={props.border}
            backgroundColor={props.backgroundColor} >
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
            height={props.height} >
            <ImagePreviewContainer handleClick={handlePreviewClose}>{image?.preview}</ImagePreviewContainer>
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

export default forwardRef(ImageUploadContainer);
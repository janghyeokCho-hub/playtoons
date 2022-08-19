import React, {useCallback} from 'react';
import styled from "styled-components";
import {  Body3, Border1pxTiara } from "@/styledMixins";
import {useDropzone} from 'react-dropzone'

export default function MyDropzone(props) {
  const { className, labelClassName, textPutImage, textDragNDrop, handleFile } = props;

  const onDrop = useCallback(async (acceptedFiles) => {
    if( handleFile !== undefined ){ handleFile(acceptedFiles[0]); }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const InputProps = {
    ...getInputProps(),
    multiple: false,
    accept: "image/gif, image/jpg, image/jpeg",
  };

  const RootProps = {
    ...getRootProps(),
  };

  return (
    <Container {...RootProps} maxSize={100} multiple={false} className={`${className || ""} `}>
      <input {...InputProps} />
      {isDragActive ? (
        <p>{textPutImage}</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "3em", marginBottom: "5px" }}>
            <i className="fas fa-file-upload"></i>
          </div>
          <TextlabelDragNDrop className={`${className || ""}`}>{textDragNDrop}</TextlabelDragNDrop>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  ${Border1pxTiara}
  position: absolute;
  width: 220px;
  height: 300px;
  top: 1099px;
  left: 746px;
  border-radius: 4px;

  &.dashboard_upload_timeline{
    width: 699px;
    top: 1463px;
    left: 746px;
    }
`;

const TextlabelDragNDrop = styled.div `
  ${Body3}
  position: relative;
  width: 100%;
  height: 300px;
  color: var(--deep-space-sparkle);
  text-align: center;
  line-height: 360px;
  white-space: nowrap;
  
  &.dashboard_upload_timeline{
    line-height: 360px;
  }
`;
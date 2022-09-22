import React, { useCallback, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/pro-solid-svg-icons";

import ImagePreviewContainer from '@COMPONENTS/dashboard/ImagePreviewContainer';

// TODO image preview 스타일 임시 적용 
import "@/css/test.css";

/**
 * 
 * 이미지 파일 drag n drop, preivew 컴포넌트 
  <ImageUploadContainer
    ref={refCoverImage}
    className={"small"}
    preview={imageUrl}
    name={"coverImage"}                     
    textDragNDrop={text.label_drag_drop}    
    textInputMessage={text.input_image}     
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
  const { className, preview, textDragNDrop, name, id } = props;
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
  //==============================================================================

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
      preview : preview
    });
  }, [preview]);

  return (
    <div 
      className={`box_drag ${className}`}
       >
        {/* upload에 쓰일 hash 값 저장 */}
      <input type={"text"} name={name} defaultValue={image?.hash} style={{display: "none"}} />  
        {/* file input tag */}
      <input {...InputProps} id={id} />
      {
        image?.preview === undefined ? (
          <label htmlFor={id} className="filetxt">
            <div 
              {...RootProps} 
              maxsize={100} 
              multiple={false} 
              className={`${className} image_upload`} >
                {  isDragActive ? (
                  <div className={`${className}_text_container image_upload_text_container`}>
                      <div className={`${className}_text image_upload_text`}>{props.textInputMessage}</div>
                    </div>
                  ) : (
                    
                    <div className="txt">
                        <div className="ico"><FontAwesomeIcon icon={faCirclePlus} /></div>
                        <p className="t">{textDragNDrop}</p>
                      </div>
                    
                    )
                  }
            </div>
          </label>
        ) : (
          // /* TODO preview 일때 border 변경  */
          <label htmlFor={id} className="filetxt preview_border">
            <div className={"image_preivew"}>
              <ImagePreviewContainer handleClick={handlePreviewClose}>{image?.preview}</ImagePreviewContainer>
            </div>
          </label>
        )
      }
    </div>
  );
}


export default forwardRef(ImageUploadContainer);
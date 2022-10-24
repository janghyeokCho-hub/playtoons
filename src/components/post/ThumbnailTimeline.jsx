import React, { useCallback, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashXmark } from "@fortawesome/pro-solid-svg-icons";
import ErrorMessage from '../dashboard/ErrorMessage';
import { getFileUrlFromServer } from '@/services/fileService';
import { FILE_MAX_SIZE } from '@/common/constant';

/**
 * 
 * 이미지 파일 drag n drop, preivew 컴포넌트 
  <ThumbnailTimeline
    ref={refThumbnailTimeline}
    preview={imageUrl}
    id={"filebox1"}
    name={"thumbnailTimeline"}                     
    textDragNDrop={text.label_drag_drop}    
    textInputMessage={text.input_image}     
    textEdit={text.edit}
    />
  
  ex) 이미지 파일 정보 가져오기 file, preview, hash
    refCoverImage.current.getImageFile();
  ex) hash 정보 input에 넣기 
    refCoverImage.current.setImageHash(hash);
  ex) image file 정보 input에 넣기 
    refCoverImage.current.setImage({file: undefined, preview: undefined, hash: undefined, filename: "", fileLenth: ""});
 * @version 1.0.0
 * @author 2hyunkook
 * @param ref image file 접근을 위한 reference 
 * @param id file input tag id
 * @param name upload parameter name (hash값을 가진 input tag name)
 * @param className box_drag 와 같이 쓰일 class name
 * @param image image preview
 * @param textDragNDrop 평소에 보여질 drag n drop text
 * @param textInputMessage drag 가 영역에 들어왔을때 보여질 text
 * @param textEdit 편집 button에 보여질 text
 * @param handleClose 
 * @param handleEdit 
 */
export default forwardRef( function ThumbnailTimeline(props, ref) {
  // file : 컴퓨터에서 선택된 file, preview : preview로 보여질 이미지(file url, data url), hash : 파일 업로드 후 받아온 hash
  const initImageObject = {file: undefined, preview: undefined, hash: undefined, filename: "", fileLenth: ""};
  const { className, textDragNDrop, name, id, textEdit, handleClose, handleEdit, previewHash, callback } = props;
  const [stateImage, setStateImage] = useState(initImageObject);
  const [stateError, setStateError] = useState(undefined);
      

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
      setStateImage({
        ...stateImage,
        file: file,
        preview: reader.result
      });
    };
  };


  //==============================================================================
  // api
  //==============================================================================
  const getImageUrl = async (hash) => {
    const {status, data} = await getFileUrlFromServer(hash);
    
    if( status === 200 ){
      setStateImage({
        ...stateImage,
        preview: data?.url
      });
    }
    else{
      setStateError( String(status, data) );
      // setStateError( undefined );
    }
  };

  //=============== file drag n drop 설정 ==========================================
  const onDrop = useCallback(async (acceptedFiles) => {
    setPreviewImage(acceptedFiles[0]);
  }, []);
  const { 
    getRootProps, 
    getInputProps, 
    open ,
    isDragActive, 
  } = useDropzone({ 
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    noDragEventsBubbling: true,
    noKeyboard: true,
    maxSize: FILE_MAX_SIZE,
    onDropAccepted: (accept) => setStateError(undefined),
    onDropRejected: (reject) => handleRejected(reject),
  });
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
  const handleRejected = (reject) => {
    let message = '';
    for( let i = 0; i < reject[0].errors.length; i++ ){
      message += reject[0].errors[i].message;

      if( i !== reject[0].errors.length - 1 ){
        message += ' and ';
      }
    }
    
    setStateError(message);
  };

  const handlePreviewClose = (event) => {
    setStateImage(initImageObject);
    handleClose?.();
  };

  const handleClickEdit = (event) => {
    open();
    handleEdit?.();
  };

  useImperativeHandle(ref, () => ({
    setImageValueToInputTag: (v) => {
      setStateImage({...stateImage, hash: v});
    },
    setImageHash: (hash) => {
      setStateImage({...stateImage, hash: hash});
    },
    setImage: (imageFileInfo) => {
      setStateImage(imageFileInfo);
    },
    getImageFile: () => {
      return stateImage.file;
    },
    setError: (msg) => {
      setStateError(msg);
    },
    checkToEmpty: () => {
      if( JSON.stringify(stateImage) === JSON.stringify(initImageObject) ){
        return true;
      }

      return false;
    },
  }));

  useEffect(() => {
    if( previewHash !== undefined ){
      setStateImage({
        ...stateImage,
        hash: previewHash
      });
      getImageUrl(previewHash);
    }
  }, [previewHash]);

  useEffect(() => {
    setStateImage(props.image);
  }, [props.image]);

  useEffect(() => {
    if( stateImage?.hash !== undefined ){
      callback?.(stateImage);
    }
  }, [stateImage?.hash]);


  return (
    <>
      <div 
        className={`box_drag ${className}`} >
          {/* upload에 쓰일 hash 값 저장 */}
        <input type={"text"} name={name} defaultValue={stateImage?.hash} style={{display: "none"}} />  
          {/* file input tag */}
        <input {...InputProps} id={id} />
        {
          stateImage?.preview === undefined ? (
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
            <div className={"fileview2"}>
              <div><img src={stateImage?.preview} alt="preview" /></div>
              <span className="f_tx">{stateImage?.filename}<em>{stateImage?.fileLenth}</em></span>
                <button type="button" className="btn_del" title="削除"><FontAwesomeIcon icon={faTrashXmark} onClick={handlePreviewClose} /></button>
                <button type="button" className="btn-pk n blue" onClick={handleClickEdit}><span>{textEdit}</span></button>
            </div>
          )
        }
      </div>
      
      <ErrorMessage error={stateError} />
    </>
  );
});


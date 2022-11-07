import React, { useCallback, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark, faTrashXmark } from "@fortawesome/pro-solid-svg-icons";
import { getFileUrlFromServer } from '@/services/dashboardService';
import ErrorMessage from './ErrorMessage';
import { FILE_MAX_SIZE } from '@/common/constant';

/**
 * 
 * 이미지 파일 drag n drop, preivew 컴포넌트 
  <ImageUpload
    ref={refCoverImage}
    className={"small"}
    preview={imageUrl}
    id={"filebox2"}
    name={"coverImage"}                     
    text={text.drag_drop}    
    callback={callback}
    />
  
  ex) 이미지 파일 정보 가져오기 file, preview, hash
    refCoverImage.current.getImageFile();
  ex) hash 정보 input에 넣기 
    refCoverImage.current.setImageHash(hash);
  ex) image file 정보 input에 넣기 
    refCoverImage.current.setImage(fileUrl, hash);
 * @version 1.0.0
 * @author 2hyunkook
 * @param ref image file 접근을 위한 reference 
 * @param className box_drag 와 같이 쓰일 class name
 * @param preview image preview             file or file server url
 * @param id file input tag id
 * @param name upload parameter name 
 * @param text 평소에 보여질 drag n drop text
 * @param callback image value 설정 후 callback func
 */
export default forwardRef(function ImageUpload(props, ref) {
  const { className, preview, text, textEdit, name, id, callback, handleEdit, previewHash, renderType, multiple = false } = props;
  // file : 컴퓨터에서 선택된 file, preview : preview로 보여질 이미지(file url, data url), hash : 파일 업로드 후 받아온 hash
  const initImageObject = {file: undefined, preview: undefined, value: undefined, filename: "", fileLenth: "", mode: undefined};
  const [stateImage, setStateImage] = useState(initImageObject);
  const [stateError, setStateError] = useState(undefined);

  //==============================================================================
  // function 
  //==============================================================================
  /**
     업로드 전 preview 생성
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
        preview: data?.url,
        mode: undefined,
      });
    }
    else{
      setStateError( status + ' : ' + data );
      setStateImage({
        ...stateImage,
        mode: undefined,
      });
    }
  };

  //==============================================================================
  // file drag n drop 설정
  //==============================================================================
  const onDrop = useCallback(async (acceptedFiles) => {
    setPreviewImage(acceptedFiles[0]);
  }, []);

  const { 
    getRootProps, 
    getInputProps, 
    open ,
  } = useDropzone({ 
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
    },
    noDragEventsBubbling: true,
    noKeyboard: true,
    maxSize: FILE_MAX_SIZE,
    onDropAccepted: (accept) => setStateError(undefined),
    onDropRejected: (reject) => handleRejected(reject),
    multiple: multiple,          //TODO multi로 변경 예정
  }); //isDragActive

  const InputProps = {
    ...getInputProps(),
    accept: "image/gif, image/jpg, image/jpeg, image/png",
    type: "file"
  };

  const RootProps = {
    ...getRootProps(),
  };

  //==============================================================================
  // event
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

  const handlePreviewClose = () => {
    setStateImage(initImageObject);
  };

  const handleClickEdit = () => {
    open();
    handleEdit?.();
  };

  //==============================================================================
  // hook & render
  //==============================================================================

  useImperativeHandle(ref, () => ({
    setImageValueToInputTag: (hash) => {
      setStateImage({...stateImage, value: hash});
    },
    setImage: (fileUrl, hash) => {
      setStateImage({...stateImage, preview: fileUrl, value: hash});
    },
    getImageFile: () => {
      return stateImage.file;
    },
    setThumbnailImage: (hash) => {
      setStateImage({...stateImage, value: hash, mode: 'input'});
    },
    getImageInfo: () => {
      return stateImage;
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
    if( preview !== undefined ){
      setStateImage({
        ...stateImage,
        preview : preview
      });
    }
  }, [preview]);

  useEffect(() => {
    if( previewHash !== undefined ){
      getImageUrl(previewHash);
    }
  }, [previewHash]);

  useEffect(() => {
    if( stateImage.value !== undefined ){
      if( stateImage.mode === undefined ){
        //upload
        callback?.();
      }
      else{
        //get thumbnail
        getImageUrl(stateImage.value);
      }
    }
  }, [stateImage.value]);

  return (
    <>
      <div 
        className={`${className}`}
        onClick={e => e.preventDefault()} 
        >
          {/* upload에 쓰일 값  저장 */}
        <input type={"text"} name={name} defaultValue={stateImage?.value} style={{display: "none"}} />  
          {/* file input tag */}
        <input {...InputProps} id={id}  />
        {
          stateImage?.preview === undefined ? (
            <label htmlFor={id} className="filetxt" >
              <div 
                {...RootProps} 
                className={`wh100`} >
                  {
                    text === undefined ? 
                      <div className="ico fa-solid"><FontAwesomeIcon icon={faCirclePlus} /></div>
                      :
                      <div className="txt">
                        <div className="ico fa-solid"><FontAwesomeIcon icon={faCirclePlus} /></div>
                        <p className="t">{text}</p>
                      </div>
                  }
                  
              </div>
            </label>
          ) : (
            <>
              {/* render preview  */}
              {/* //==============================================================================
                  // normal style
                  //============================================================================== */}
                    {
                      renderType === undefined && (
                        <div className={"fileview"}>
                          <div><img src={stateImage?.preview} alt="preview" /></div>
                          <button type="button" className="btn_del" title="削除">
                            <FontAwesomeIcon 
                                  icon={faCircleXmark}
                                  onClick={handlePreviewClose}
                                  />
                            </button>
                        </div>
                      )
                    }


              {/* //==============================================================================
                  // thumbnail style
                  //============================================================================== */}
                    {
                      renderType === 'thumbnail' && (
                        <div className={"fileview2"}>
                          <div><img src={stateImage?.preview} alt="preview" /></div>
                          <span className="f_tx">{stateImage?.filename}<em>{stateImage?.fileLenth}</em></span>
                            <button type="button" className="btn_del" title="削除"><FontAwesomeIcon icon={faTrashXmark} onClick={handlePreviewClose} /></button>
                            <button type="button" className="btn-pk n blue" onClick={handleClickEdit}><span>{textEdit}</span></button>
                        </div>
                      )
                    }

              
            </>
          )
        }
      </div>
      
      <ErrorMessage error={stateError} />
    </>
  );
});
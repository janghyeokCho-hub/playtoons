import { getErrorMessageFromResultCode } from '@/common/common';
import { setFileToServer } from '@/services/dashboardService';
import { getFileUrlFromServer } from '@/services/fileService';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from "react-redux";
import ErrorMessage from '../dashboard/ErrorMessage';
import { useImperativeHandle, forwardRef } from 'react';

export default forwardRef(function DraftEditor(props, ref) {
  const { className } = props;
  const [ stateEditor, setStateEditor ] = useState( () => EditorState.createEmpty() );
  const [ stateContents, setStateContents ] = useState([]);
  const [ stateError, setStateError ] = useState(undefined);
  const reduxAuthors = useSelector(({ post }) => post?.authorMine?.authors);
  const reduxSeries = useSelector(({ post }) => post?.series);

  //==============================================================================
  // function 
  //==============================================================================
  const getRating = () => {
    return reduxSeries?.id === undefined ? "G" : reduxSeries?.rating;
  };

  //==============================================================================
  // api 
  //==============================================================================
  const setImageToServer = async (file, resolve, reject) => {
    // 폼데이터 구성
    const params = new FormData();
    params.append("authorId", reduxAuthors[0].id);
    params.append("subscribeTierId", "");
    params.append("productId", "");
    params.append("usage", 'attachment'); //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("type", "image"); //image, video, binary
    params.append("loginRequired", false); //언제 체크해서 보내는건지?
    params.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
    params.append("rating", getRating()); //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", file);

    const { status, data: resultData } = await setFileToServer(params);
    console.log("setFile result", status, resultData);

    //create sccuess
    if (status === 201) {
      getImage(resultData?.hash, resolve, reject);
    } else {
      //error 처리
      reject( status + getErrorMessageFromResultCode(resultData) );
      setStateError(status + getErrorMessageFromResultCode(resultData));
    }
  };

  const getImage = async (hash, resolve, reject) => {
    const params = new FormData();
    const { status, data } = await getFileUrlFromServer(hash, params);

    if (status === 200) {
      resolve({ data: { link:  data?.url }});
    } else {
      //error 처리
      reject( status + getErrorMessageFromResultCode(data) );
      setStateError(status + getErrorMessageFromResultCode(data));
    }
  };

  //==============================================================================
  // event 
  //==============================================================================
  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setStateEditor(editorState);
  };

  const onContentStateChange = (content) => {
    setStateContents(content.blocks);
  };

  const handleUploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = async () => {
          setImageToServer(file, resolve, reject);
        };

        reader.readAsDataURL(file);
    });
  };

  //==============================================================================
  // hook & render
  //==============================================================================
  
  
  useImperativeHandle(ref, () => ({
    isEmpty: () => {
      return (stateContents.length === 0) || (stateContents.length === 1 && stateContents[0].text === '');
    },
    setError: (text) => {
      setStateError(text);
    },
    getContent: () => {
      return draftToHtml(convertToRaw(stateEditor.getCurrentContent()));
    },
  }));


  return (
    <>
      <div className={className}>
        <Editor
            wrapperClassName="draft_editor"
            editorClassName="editor"
            toolbarClassName="toolbar-class"
            toolbar={{    //2022.11.08 lhk- 
              options: ['inline', 'image'],
              inline: { 
                inDropdown: false, 
                options: ['bold', 'italic', 'underline', 'strikethrough',],
              },
              image: {
                urlEnabled: false,
                uploadEnabled: true,
                alignmentEnabled: true,
                uploadCallback: handleUploadImage,
                previewImage: true,
                inputAccept: 'image/gif, image/jpeg, image/jpg, image/png, image/svg',
                alt: { present: true, mandatory: false },
                defaultSize: {
                  height: 'auto',
                  width: 'auto',
                },
                // icon: image,
                // className: undefined,
                // component: undefined,
                // popupClassName: undefined,
              },
            }} 
            placeholder="내용을 작성해주세요."
            // 한국어 설정
            localization={{
                locale: 'ko',
            }}
            // 초기값 설정
            editorState={stateEditor}
            // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
            onEditorStateChange={onEditorStateChange}
            onContentStateChange={onContentStateChange}
        />

      </div>
    
      <ErrorMessage error={stateError} />
    </>
  )
});

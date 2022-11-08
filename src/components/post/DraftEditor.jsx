import { EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function DraftEditor(props) {
  const { className } = props;
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  return (
    <div className={className}>
      <Editor
          wrapperClassName="wrapper-class"
          editorClassName="editor"
          toolbarClassName="toolbar-class"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: false },
            textAlign: { inDropdown: false },
            link: { inDropdown: false },
            history: { inDropdown: false },
          }} 
          placeholder="내용을 작성해주세요."
          // 한국어 설정
          localization={{
              locale: 'ko',
          }}
          // 초기값 설정
          editorState={editorState}
          // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
          onEditorStateChange={onEditorStateChange}
      />
    </div>
  )
}

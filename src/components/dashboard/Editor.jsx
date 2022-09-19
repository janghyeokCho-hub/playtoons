import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

/**
*
   editor 
   
   <Editor />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function Editor(props) {
  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
            const body = new FormData();
            loader.file.then((file) => {
                body.append("files", file);
            

                });
            });
      }
    }
  };

  const uploadPlugin = (editor) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  };

  return (
    <div className="ckeditor_container">
      <CKEditor
          editor={ ClassicEditor }
          data=""
          config={{
            // removePlugins: [ 'Heading', 'MediaEmbed' ]
          }} 
          onReady={ editor => {
            uploadPlugin(editor);
            console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              console.log( { event, editor, data } );
          } }
          onBlur={ ( event, editor ) => {
              console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              console.log( 'Focus.', editor );
          } }
      />
    </div>
  );
}

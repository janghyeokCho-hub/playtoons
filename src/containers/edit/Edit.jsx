import React from 'react';
import { Route, Routes } from "react-router-dom";
import Post from "@/containers/upload/UploadPost";

/**
* Edit url 분기 처리
*
* @version 1.0.0
* @author 이현국
*/
export default function Edit() {
  return (
    <Routes>
      <Route 
        path="/post/:id" 
        element={<Post />} 
      />
    </Routes>
  )
}

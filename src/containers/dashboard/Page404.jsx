import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page404() {
  const naviage = useNavigate();

  const handleClickPage = (event) => {
    console.log('Page', event);
    naviage('/dashboard/main');
  };
  
  useEffect(() => {
    
    setTimeout(() => {
      naviage('/dashboard/main');
    }, 2000);

  }, []);

  return (
    <div onClick={handleClickPage}><h1 style={{width: "100%", paddingBottom: "100%"}}>Not Found page</h1></div>
  )
}

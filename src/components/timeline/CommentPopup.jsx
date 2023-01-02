import { useEffect } from "react";
import { useCallback, useState } from "react";
import Comment from "./Comment";

import Toast from "./Toast";



export default function CommentPopup(props){
  const { item } = props;
  const [ stateToast, setStateToast ] = useState({type: undefined, message: undefined, show: false});
  const url = `${window.location.origin}/post/detail/${item?.type?.code}/${item?.id}`;


  return (
    <>
      <Comment item={item} />
    
    </>
  );
};


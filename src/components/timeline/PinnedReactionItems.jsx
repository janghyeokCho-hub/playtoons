import { showOneButtonPopup } from '@/common/common';
import { getReactionFromServer } from '@/services/dashboardService';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactionItem from './ReactionItem';

export default function PinnedReactionItems(props) {
  const { item } = props;
  const [ stateReactions, setStateReactions ] = useState(undefined);
  const dispatch = useDispatch();

  const getPinnedReactions = async () => {
    const formData = new FormData();
    formData.append("postId", item?.id);
    formData.append("pinned", true);
 
    const { status, data } = await getReactionFromServer(formData);

    if (status === 200) {
      setStateReactions(data);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  useEffect(() => {
    if( !stateReactions ){
      getPinnedReactions();
    }
  }, []);

  return (
    <>
      {
        stateReactions?.reactions?.map((item, index) => {
          return <ReactionItem key={`reply_${index}`} item={item} />;
        })
      }
    </>
  )
}

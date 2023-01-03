import { showOneButtonPopup } from '@/common/common';
import { getReactionFromServer } from '@/services/dashboardService';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import IconWithText from '../dashboard/IconWithText';
import ProfileSpan from '../dashboard/ProfileSpan';
import SeeMoreComent from '../dashboard/SeeMoreComent';
import ReactionItem from './ReactionItem';
import ReactionItems from './ReactionItems';

export default function Comment(props) {
  //TODO comment 공통화 작업
  const { item } = props; 
  const [ statePinnedReactions, setStatePinnedReactions ] = useState(undefined);
  const [ stateReactions, setStateReactions ] = useState(undefined);
  const dispatch = useDispatch();

  //==============================================================================
  // function
  //==============================================================================
  //==============================================================================
  // api
  //==============================================================================
  const getPinnedReactions = async () => {
    const formData = new FormData();
    formData.append("postId", item?.id);
    formData.append("pinned", true);
 
    const { status, data } = await getReactionFromServer(formData);

    if (status === 200) {
      setStatePinnedReactions(data);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  const getReactions = async (page, isAdd) => {
    const formData = new FormData();
    formData.append("postId", item?.id);
    formData.append("page", page);
    formData.append("limit", 3);
 
    const { status, data } = await getReactionFromServer(formData);

    if (status === 200) {
      setStateReactions(data);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };
  //==============================================================================
  // handler
  //==============================================================================
  
  const handleCommentRegister = (event) => {
    console.log('CommentRegister', event);
    
  };
  //==============================================================================
  // hook & render
  //==============================================================================
  const renderPinnedReactions = () => {
    return statePinnedReactions?.reactions?.map((item, index) => {
      return (
        <ReactionItem key={`reply_${index}`} item={item} />
      );
    });
  };

  const renderReactions = () => {
    return stateReactions?.reactions?.map((item, index) => {
      return (
        <ReactionItem key={`reply_${index}`} item={item} />
      );
    });
  };

  useEffect(() => {
    if( !statePinnedReactions ){
      getPinnedReactions();
    }
    if( !stateReactions ){
      getReactions(1, false);
    }
  }, []);

  return (
    <div className="wrap_comment">
      <div className="top_comm">
        <div className="imgs">
          <ProfileSpan hash={item?.author?.profileImage} />
        </div>
        <IconWithText
          postInfo={item}
          callback={handleCommentRegister}
        />
      </div>
      
      <div className="lst_comm">
        {renderPinnedReactions()}
        {renderReactions()}
        
        <SeeMoreComent 
          text={{}}
          meta={stateReactions?.meta}
          callback={(page) => getReactions(page, true)}
          />
      </div>
    </div>
  )
}

import { showOneButtonPopup } from '@/common/common';
import { setRefreshAction } from '@/modules/redux/ducks/timeline';
import { getReactionFromServer } from '@/services/dashboardService';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import IconWithText from '../dashboard/IconWithText';
import ProfileSpan from '../dashboard/ProfileSpan';
import SeeMoreComent from '../dashboard/SeeMoreComent';
import ReactionItem from './ReactionItem';

export default function Comment(props) {
  const { item } = props; 
  const [ statePinnedReactions, setStatePinnedReactions ] = useState(undefined);
  const [ stateReactions, setStateReactions ] = useState(undefined);
  const dispatch = useDispatch();

  //==============================================================================
  // function
  //==============================================================================
  const refreshReactionList = async() => {
    getPinnedReactions();
    getReactions(1, false);
    dispatch( setRefreshAction({type : 'timeline', id: item?.id}) );
  };
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
    formData.append("limit", 5);
 
    const { status, data } = await getReactionFromServer(formData);
    console.log('getReactions', data);

    if (status === 200) {
      if( isAdd ){
        let list = stateReactions.reactions;
        list.push.apply(list, data.reactions);
        setStateReactions({
          meta: data.meta,
          reactions: list
        });
      }
      else{
        setStateReactions(data);
      }
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };
  //==============================================================================
  // handler
  //==============================================================================
  
  const handleCommentRegister = () => {
    refreshReactionList();
  };
  //==============================================================================
  // hook & render
  //==============================================================================
  const renderPinnedReactions = () => {
    return statePinnedReactions?.reactions?.map((reactionItem, index) => {
      return (
        <ReactionItem key={`reply_${index}`} item={reactionItem} postInfo={item} callback={() => refreshReactionList()} />
      );
    });
  };

  const renderReactions = () => {
    return stateReactions?.reactions?.map((reactionItem, index) => {
      return (
        <ReactionItem key={`reply_${index}`} item={reactionItem} postInfo={item} callback={() => refreshReactionList()}/>
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
          text={{see_more_coment: 'コメントをもっと見る'}}
          meta={stateReactions?.meta}
          callback={(page) => getReactions(page, true)}
          />
      </div>
    </div>
  )
}

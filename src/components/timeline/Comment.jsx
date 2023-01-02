import React from 'react';
import IconWithText from '../dashboard/IconWithText';
import ProfileSpan from '../dashboard/ProfileSpan';

export default function Comment(props) {
  //TODO comment 공통화 작업
  const { item } = props;

  const handleCommentRegister = (event) => {
    console.log('CommentRegister', event);
    
  };

  return (
    <div className="wrap_comment">
      <div className="top_comm">
        <div className="imgs">
          <ProfileSpan hash={item?.author?.profileImage} />
        </div>
        <IconWithText
          postInfo={item}
          text={{}}
          callback={handleCommentRegister}
        />
      </div>

      {/* 
      <div className="lst_comm">
        {renderReactionList(statePinnedReactions)}
        {renderReactionList(stateReactions)}
        
        <SeeMoreComent 
          text={text}
          meta={stateReactions?.meta}
          callback={(page) => getReactions(page, true)}
          />
      </div> */}
    </div>
  )
}

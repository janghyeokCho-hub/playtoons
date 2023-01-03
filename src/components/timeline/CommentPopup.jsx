import Comment from "./Comment";
import {convertMoneyStyleString} from '@/common/common';



export default function CommentPopup(props){
  const { item } = props;

  return (
    <>
      <div className="col top">
        <h3 className="title">
          {'コメント'}<span className="comm_num">{convertMoneyStyleString(item?.reactionCount)}</span>
        </h3>
      </div>
      <Comment className={'popup'} item={item} />
    
    </>
  );
};


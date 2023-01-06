import { convertMoneyStyleString } from '@/common/common';
import { useSelector } from 'react-redux';
import Comment from "./Comment";



export default function CommentPopup(props){
  const reduxTimeline = useSelector(({timeline}) => timeline.timeline);

  return (
    <>
      <div className="col top">
        <h3 className="title">
          {'コメント'}<span className="comm_num">{convertMoneyStyleString(reduxTimeline?.reactionCount)}</span>
        </h3>
      </div>
      <Comment className={'popup'} item={reduxTimeline} />
    
    </>
  );
};


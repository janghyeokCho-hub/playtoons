import { getAuthorPostListAction } from "@/modules/redux/ducks/author";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MyPagination from "../dashboard/MyPagination";
import PostItem from "./PostItem";

const PostItems = () => {
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  useLayoutEffect(() => {
    if( params ){
      dispatch( getAuthorPostListAction({authorId: params.id, page: params.page}) );
    }
  }, [params]);

  return (
    <>
      <div className="lst_detail">
        <ul>
            {
              currentAuthor?.posts?.posts?.map((post, index) => (
                <PostItem key={`post_${index}`} item={post} />
              ))
            }
        </ul>
      </div>

      <MyPagination
          meta={currentAuthor?.posts?.meta}
          callback={(page) => navigate(`/author/${params.id}/post/${page}`) }
          />
    </>
  );
};
export default PostItems;

import { showOneButtonPopup } from "@/common/common";
import { getPosts } from "@/services/postService";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EmptyDiv from "../dashboard/EmptyDiv";
import MyPagination from "../dashboard/MyPagination";
import PostItem from "./PostItem";

const PostItems = () => {
  const [ stateData, setStateData ] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const getPostList = async () => {
    const json = {
      authorId: params.id,
      page: params.page
    };
    const {status, data} = await getPosts(json);
    console.log('getPostList', status, data);
    
    if( status === 200 ){
      setStateData(data);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };

  useLayoutEffect(() => {
    if( params ){
      getPostList();
    }
  }, [params]);

  const renderPostList = () => {
    if( stateData?.meta?.totalItems === 0 ){
      return (
        <EmptyDiv
          className={"relative empty"}
          text={`投稿がいません。`}
        />
      );
    }
    
    return stateData?.posts?.map((item, index) => {
      return (
        <PostItem key={`post_${index}`} item={item} />
      );
    });
  };

  return (
    <>
      <div className="lst_detail">
        <ul>
            {
              renderPostList()
            }
        </ul>
      </div>

      <MyPagination
          meta={stateData?.meta}
          callback={(page) => navigate(`/author/${params.id}/post/${page}`) }
          />
    </>
  );
};
export default PostItems;

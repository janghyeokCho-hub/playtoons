import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import useFilePath from "@/hook/useFilePath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCommentQuote,
  faShare,
  faCircleCheck,
  faLock,
} from "@fortawesome/pro-solid-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-light-svg-icons";
import SharePopup from "./SharePopup";
import UnFollowPopup from "./UnFollowPopup";
import {
  getPostSeriesDetail as getPostSeriesDetailAPI,
  getPosts as getPostsAPI,
} from "@/services/postService";
import moment from "moment";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  getPostDetailFromServer as getPostDetilAPI,
  getPostContent as getPostContentAPI,
} from "@/services/postService";

const Series = ({ id }) => {
  const location = useLocation();
  const postType = location?.state?.postType;
  const [series, setSeries] = useState(null);
  const [posts, setPosts] = useState(null);
  const [isSharePopupShow, setIsSharePopupShow] = useState(false);
  const [isUnFollowPopupShow, setIsUnFollowPopupShow] = useState(false);
  const [sortTab, setSortTab] = useState("DESC");

  const coverImgURL = useFilePath(series?.coverImage);
  const profileImgURL = useFilePath(series?.author?.profileImage);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (posts?.length) {
      const list = posts.sort((a, b) => {
        a = new Date(a.startAt);
        b = new Date(b.startAt);
        if (sortTab === "ASC") {
          return a - b;
        } else {
          return b - a;
        }
      });
      setPosts(list);
    }
  }, [sortTab, posts]);

  useEffect(() => {
    async function getSeriesDetail(seriesId) {
      const response = await getPostSeriesDetailAPI(seriesId);
      if (response.status === 200) {
        setSeries(response.data.series);
      }
    }
    if (id && !series) {
      getSeriesDetail(id);
    }
  }, [id, series]);

  const getPosts = useCallback(async () => {
    const response = await getPostsAPI({
      authorId: series.author.id,
      seriesId: series.id,
      page: currentPage,
    });

    if (response.status === 200) {
      setPosts(response.data?.posts);
    }
  }, [series, currentPage]);

  useEffect(() => {
    if (series) {
      getPosts();
    }
  }, [series]);

  const PostComponent = ({ item }) => {
    const [post, setPost] = useState(null);
    const [isLock, setIsLock] = useState(true);
    const thumbnailImgURL = useFilePath(post?.thumbnailImage);

    const getPost = useCallback(async () => {
      const params = {
        id: item.id,
      };
      const response = await getPostDetilAPI(params);
      if (response.status === 200) {
        setPost(response.data.post);
      }
    }, [item]);

    const getPostContent = useCallback(async () => {
      const response = await getPostContentAPI(item?.id);
      if (response.status === 200) {
        setIsLock(false);
      } else {
        setIsLock(true);
      }
    }, [item]);

    useEffect(() => {
      getPost();
      getPostContent();
    }, []);

    return (
      <li className="item">
        {post && (
          <Link
            to={`/post/detail/${post.type.code}/${post?.id}`}
            state={{ item: post }}
          >
            <div className="thumb">
              <img src={thumbnailImgURL} alt="" />

              {isLock && (
                <div className="area_lock">
                  <div>
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                </div>
              )}
            </div>
            <div className="txt">
              <p className="h1">
                <span className="i-txt">支援</span>
                {post?.title}
              </p>
              <p className="t1">{post?.description}</p>
            </div>
            <div className="botm">
              <p className="d1">
                {moment(post?.startAt).format("YYYY/MM/DD HH:mm")}
              </p>
              <button type="button" className="btn01">
                <FontAwesomeIcon icon={faHeart} />
                {post?.likeCount}
              </button>
              <button type="button" className="btn01">
                <FontAwesomeIcon icon={faCommentQuote} />
                {post?.commnetCount}
              </button>
            </div>
          </Link>
        )}
      </li>
    );
  };
  return (
    <>
      <div className="wrap_series_detail">
        <div className="top_detail">
          <div className="ar_view">
            <div className="thumb">
              <img src={coverImgURL} alt="만화책" />
            </div>
            <div className="cont">
              <div className="tit">
                <p className="h1">{series?.title}</p>
                <div className="rgh">
                  <button type="button" className="btn01">
                    <FontAwesomeIcon icon={faHeart} />
                    {series?.likeCount || "likeCount 필드가 없음"}
                  </button>
                  <button type="button" className="btn01">
                    <FontAwesomeIcon icon={faCommentQuote} />
                    {series?.commentCount || "commentCount 필드가 없음"}
                  </button>
                  <button
                    type="button"
                    className="btn-pk n blue2"
                    onClick={() => setIsSharePopupShow(true)}
                  >
                    <FontAwesomeIcon icon={faShare} />
                    共有する
                  </button>
                </div>
              </div>
              <p className="t1">{series?.description}</p>

              <div className="lst_tag">
                {series?.tags?.map((tag, index) => (
                  <div key={`tag_${index}`} className="i_tag">
                    #{tag.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="ar_name">
            <div>
              <div className="icon">
                <SpanImg bgImg={profileImgURL}></SpanImg>
              </div>
              <p>{series?.author?.name}</p>
            </div>
            <button type="button" className="btn-pk n blue">
              支援する
            </button>
            {/*<!-- <button type="button" className="btn-pk n blue2">フォロー</button>202010 수정 : 팔로우 전 -->*/}
            <button
              type="button"
              className="btn-pk n blue btn_follow"
              onClick={() => setIsUnFollowPopupShow(true)}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
              フォロー中
            </button>
            {/*<!-- 202010 수정 : 팔로우 후 -->*/}
          </div>
        </div>

        <div className="tabs">
          <ul>
            <li
              className={sortTab === "DESC" ? "on" : ""}
              onClick={() => setSortTab("DESC")}
            >
              <a href="#">
                <span>最新話から</span>
              </a>
            </li>
            <li
              className={sortTab === "ASC" ? "on" : ""}
              onClick={() => setSortTab("ASC")}
            >
              <a href="#">
                <span>1話から</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="lst_detail">
          <ul>
            {(posts &&
              posts.map((post, index) => (
                <PostComponent key={`post_${index}`} item={post} />
              ))) || (
              <li className="item">
                <a href="#">게시글 없음</a>
              </li>
            )}
          </ul>
        </div>

        <div className="pagenation">
          <ul>
            <li className="prev">
              <a href="#">
                <FontAwesomeIcon icon={faAngleLeft} />
              </a>
            </li>
            <li className="on">
              <a href="#">1</a>
            </li>
            <li className="next">
              <a href="#">
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      {isSharePopupShow && (
        <SharePopup onClose={() => setIsSharePopupShow(false)} />
      )}
      {isUnFollowPopupShow && (
        <UnFollowPopup onClose={() => setIsUnFollowPopupShow(false)} />
      )}
    </>
  );
};

const SpanImg = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Series;

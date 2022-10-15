import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorRecent } from "@/modules/redux/ducks/author";
import RecentItems from "@COMPONENTS/author/RecentItems";
import RecommentItems from "@COMPONENTS/author/RecommentItems";
import { getAuthorList, setCurrentAuthor } from "@/modules/redux/ducks/author";

const List = () => {
  const dispatch = useDispatch();
  const recents = useSelector(({ author }) => author.recents);
  useEffect(() => {
    if (!recents?.length) {
      dispatch(getAuthorRecent());
    }
  }, [dispatch, recents]);

  const authors = useSelector(({ author }) => author.authors);

  useEffect(() => {
    if (!authors?.length) {
      dispatch(getAuthorList());
    }
  }, [dispatch, authors]);

  const handleCurrentAuthor = useCallback(
    (item) => {
      dispatch(setCurrentAuthor(item));
    },
    [dispatch]
  );

  return (
    <div className="contents mauthor">
      <div className="inr-c">
        {recents && (
          <>
            <div className="hd_titbox">
              <h2 className="h_tit0">最近確認したクリエイター</h2>
            </div>
            <RecentItems items={recents} />
          </>
        )}
        <div className="hd_titbox">
          <h2 className="h_tit0">おすすめクリエイター</h2>
        </div>
        <RecommentItems
          items={authors}
          handleCurrentAuthor={handleCurrentAuthor}
        />
      </div>
    </div>
  );
};

export default List;

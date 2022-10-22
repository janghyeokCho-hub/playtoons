import React, { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import RecentItems from "@COMPONENTS/author/RecentItems";
import RecommentItems from "@COMPONENTS/author/RecommentItems";
import { setCurrentAuthor } from "@/modules/redux/ducks/author";
import { getAuthorRecent as getAuthorRecentAPI } from "@API/authorService";
import { getCurationList as getCurationListAPI } from "@API/curationService";

const List = () => {
  const dispatch = useDispatch();

  const [recents, setRecents] = useState(null);
  const [recommend, setRecommend] = useState(null);

  const getAuthorRecents = useCallback(async () => {
    const response = await getAuthorRecentAPI();
    if (response?.status === 200) {
      setRecents(response.data.authors);
    }
  }, []);

  const getCurationList = useCallback(async () => {
    const response = await getCurationListAPI(6, { order: "DESC", limit: 6 });
    if (response?.status === 200) {
      setRecommend(response.data.authors);
    }
  }, []);

  useEffect(() => {
    getAuthorRecents();
    getCurationList();
  }, []);

  const handleCurrentAuthor = useCallback(
    (item) => {
      dispatch(setCurrentAuthor(item));
    },
    [dispatch]
  );

  return (
    <div className="contents mauthor">
      <div className="inr-c">
        <div className="hd_titbox">
          <h2 className="h_tit0">最近確認したクリエイター</h2>
        </div>
        <RecentItems items={recents} />
        <div className="hd_titbox">
          <h2 className="h_tit0">おすすめクリエイター</h2>
        </div>
        <RecommentItems
          items={recommend}
          handleCurrentAuthor={handleCurrentAuthor}
        />
      </div>
    </div>
  );
};

export default List;

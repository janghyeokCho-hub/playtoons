import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tempProfile from "@IMAGES/img_profile.png";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import Pagination from "@/components/dashboard/Pagination";
import { useDispatch } from "react-redux";
import { setHeader } from "@/modules/redux/ducks/container";

const text = {
  plan_management: "支援管理",
  subcriber_management: "支援者管理",
  subcriber_nickname: "支援者のニックネーム",
  number: "番号",
  profile: "プロフィール",
  nickname: "ニックネーム",
  plan: "プラン",
  date: "プラン開始日",
};

const tempData = {
  result: 200,
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
  },
  supporters: [
    {
      id: "1",
      image: tempProfile,
      date: "2022/04/22",
      title: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      plan: "ダイヤモンドプラン",
    },
    {
      id: "43241",
      image: tempProfile,
      date: "2022/06/30",
      title: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      plan: "プラチナプラン",
    },
    {
      id: "1231",
      image: tempProfile,
      date: "2022/08/01",
      title: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      plan: "VVIPプラン",
    },
  ],
};

export default function DashboardPlanSubsciber(props) {
  const dispatch = useDispatch();

  const handleContainer = useCallback(() => {
    const header = {
      headerClass: "header",
      containerClass: "container plan2",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: "支援者管理",
      activeMenu: "plan",
    };
    dispatch(setHeader(header));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  const [stateData, setStateData] = useState(undefined);

  const handleChange = (page) => {
    console.log("handleChange", page);
  };

  const handleClickSearchNickname = (event) => {
    console.log("SearchNickname", event);
  };

  const handleEnter = (event) => {
    console.log("Enter", event);

    if (event.keyCode === 13) {
      handleClickSearchNickname(event);
    }
  };

  const getSupportorList = () => {
    return stateData?.supporters.map((item, i) => {
      return (
        <tr key={i}>
          <td className="hide-m">{item.id}</td>
          <td className="td_profile1">
            <p className="t_profile">
              <span
                className="im mr0"
                style={{ backgroundImage: `url(${item.image})` }}
              ></span>
            </p>
          </td>
          <td className="td_profile2">{item.title}</td>
          <td className="td_type1">{item.plan}</td>
          <td className="td_day1">{item.date}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    setStateData(tempData);
  }, []);

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="hd_titbox hide-m">
          <h2 className="h_tit0">
            <span>{text.subcriber_management}</span>
          </h2>
        </div>
        <div className="hd_titbox2">
          <div className="inp_txt sch">
            <button
              type="button"
              className="btns"
              title="検索"
              onClick={handleClickSearchNickname}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input
              type="text"
              className=""
              placeholder={text.subcriber_nickname}
              onKeyDown={handleEnter}
            />
          </div>
        </div>

        <div className="tbl_basic mtbl_ty2">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs2" />
              <col className="wid3" />
              <col className="wid2" />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.profile}</th>
                <th>{text.nickname}</th>
                <th>{text.plan}</th>
                <th>{text.date}</th>
              </tr>
            </thead>
            <tbody>{getSupportorList()}</tbody>
          </table>
        </div>

        <Pagination
          className={""}
          page={stateData?.meta.currentPage}
          itemsCountPerPage={stateData?.meta.itemsPerPage}
          totalItemsCount={stateData?.meta.totalItems}
          callback={handleChange}
        />
      </div>
    </div>
  );
}

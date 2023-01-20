import { getStringOfPrice, showOneButtonPopup } from "@/common/common";
import ImageBackground from "@/components/dashboard/ImageBackground";
import { setContainer } from "@/modules/redux/ducks/container";
import { getShopProductIdFromServer } from "@/services/purchaseService";
import { faAngleLeft, faTriangleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";



export default function Detail() {
  const [ stateData, setStateData ] = useState(undefined);
  const dispatch = useDispatch();
  const params = useParams();

  //==============================================================================
  // function
  //==============================================================================

  const handleContainer = useCallback(() => {
    dispatch(
      setContainer({
        headerClass: "header",
        containerClass: "container dashboard payment purchase",
        isHeaderShow: true,
        isMenuShow: true,
        headerType: "post",
        menuType: "MAIN",
        isDetailView: false,
        activeMenu: null,
        isFooterShow: false,
      })
    );
  }, [dispatch]);

  const getShopProduct = async () => {
    const {status, data} = await getShopProductIdFromServer(params.id);
    console.log('getShopProduct', status, data);
    
    if( status === 200 ){
      setStateData(data);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };

  const handleClickDownload = useCallback((event) => {
    
    
  }, [stateData]);

  const handleClickQnA = useCallback((event) => {
    
    
  }, [stateData]);

  //==============================================================================
  // hook
  //==============================================================================

  useEffect(() => {
    handleContainer();
    getShopProduct();
  }, []);

  //==============================================================================
  // render
  //==============================================================================

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="head_con view-m">
          <button type="button" className="btn_back">
            <span className="icon">
              <FontAwesomeIcon className="fa-solid fa-angle-left" icon={faAngleLeft}></FontAwesomeIcon>
            </span>
          </button>
        </div>

        <div className="hd_titbox2">
          <h2 className="m_tit1">{"purchase name 大学のリンゴ一個の重さで10メートルの素材"}</h2>
          <p className="t1">注文番号 : 48493A321F312</p>
          <p className="d1">2022/06/01 19:21</p>
        </div>

        <div className="lft_purch">
          <div className="area_payment">
            <div className="box_thumb">
              <div className="thumb">
                <ImageBackground hash={stateData?.product.thumbnailImage}></ImageBackground>
              </div>
              <div className="txt">
                <p className="h1">{stateData?.product.name}</p>
                <p className="t1">{stateData?.product.description}</p>
                <div className="lst_exe">
                  <div className="ico">.skb</div>
                  <div className="ico">.obj</div>
                </div>
                <p className="c1">{getStringOfPrice(stateData?.product.price)}</p>
                <div className="btns">
                  <a className="btn-pk n blue mw100p" onClick={handleClickDownload}>
                    <span>ダウンロード</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rgh_purch">
          <div className="box_license">
            <div className="icon">
              <FontAwesomeIcon icon={faTriangleExclamation} className="fa-solid fa-triangle-exclamation" />
            </div>
            <div>
              <p className="t1">ライセンスの利用範囲</p>
              <p className="t2">事業者は利用不可です。</p>
            </div>
          </div>
          <div className="box_infor">
            <h2 className="h_tit1 ta-c hide-m">販売者情報</h2>

            <div className="col">
              <p className="tit1">販売者</p>
              <div className="t_profile">
                <ImageBackground
                  className="im"
                  hash={stateData?.product.author.profileImage}
                ></ImageBackground>
                <p>{stateData?.product.author.nickname}</p>
              </div>
            </div>

            <ul className="col">
              <li>
                <p className="tit1">法人番号</p>
                <p>6012401016428</p>
              </li>
              <li>
                <p className="tit1">商号又は名称</p>
                <p>株式会社虹色</p>
              </li>
              <li>
                <p className="tit1">本店又は主たる事務所の所在地</p>
                <p>東京都渋谷区渋谷1丁目12番2号</p>
              </li>
            </ul>
            <div className="btn-bot">
              <a className="btn-pk n blue2 w100p" onClick={handleClickQnA}>
                販売者にお問い合わせ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

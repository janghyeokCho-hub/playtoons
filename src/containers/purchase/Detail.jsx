import { getStringOfPlaycoin, showOneButtonPopup } from "@/common/common";
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
          <h2 className="m_tit1">{"purchase name ????????????????????????????????????10?????????????????????"}</h2>
          <p className="t1">???????????? : 48493A321F312</p>
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
                <p className="c1">{getStringOfPlaycoin(stateData?.product.price)}</p>
                <div className="btns">
                  <a className="btn-pk n blue mw100p" onClick={handleClickDownload}>
                    <span>??????????????????</span>
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
              <p className="t1">??????????????????????????????</p>
              <p className="t2">?????????????????????????????????</p>
            </div>
          </div>
          <div className="box_infor">
            <h2 className="h_tit1 ta-c hide-m">???????????????</h2>

            <div className="col">
              <p className="tit1">?????????</p>
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
                <p className="tit1">????????????</p>
                <p>6012401016428</p>
              </li>
              <li>
                <p className="tit1">??????????????????</p>
                <p>??????????????????</p>
              </li>
              <li>
                <p className="tit1">??????????????????????????????????????????</p>
                <p>????????????????????????1??????12???2???</p>
              </li>
            </ul>
            <div className="btn-bot">
              <a className="btn-pk n blue2 w100p" onClick={handleClickQnA}>
                ??????????????????????????????
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

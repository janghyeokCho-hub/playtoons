import { showOneButtonPopup } from '@/common/common';
import { initAccountAction, setAccountAction } from '@/modules/redux/ducks/account';
import { setContainer } from '@/modules/redux/ducks/container';
import { setUserInfo } from '@/modules/redux/ducks/login';
import { getAccount } from '@/services/accountService';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/dashboard/Button';
import ImageUpload from '../../components/dashboard/ImageUpload';
import Input from '../../components/dashboard/Input';
import ToolTip from '../../components/dashboard/ToolTip';

export default function Edit() {
  const reduxUserInfo = useSelector(({ login }) => login.userInfo);
  const reduxUpload = useSelector(({ account }) => account.accountUpload);
  const accessToken = useSelector(({ login }) => login.accessToken);
  const dispatch = useDispatch();
  const refNickname = useRef();
  const refProfile = useRef();
  const refButton = useRef();


  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container list",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "post",
      menuType: "",
      isDetailView: false,
      activeMenu: "",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  const handleClickRegister = (event) => {
    dispatch( 
      setAccountAction({
        name: refNickname.current.getValue(),
        fileInfoProfile: refProfile.current.getImageFile()
      }) 
    );
  };

  const getUserInfo = async () => {
    const {status, data} = await getAccount(accessToken);
    console.log('getUserInfo', status, data);
    
    if( status === 200 ){
      dispatch(setUserInfo(data));
      showOneButtonPopup(dispatch, "基本プロフィル編集しました。" );
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };


  useLayoutEffect(() => {
    handleContainer();
  }, []);

  useEffect(() => {
    if( reduxUpload ){
      if (reduxUpload?.status === 200) {
        getUserInfo();
      } else {
        if( reduxUpload?.type === "profile" ){
          refProfile.current.setError(String(reduxUpload?.data));
        } else {
          showOneButtonPopup(dispatch, reduxUpload?.data );
        }
      }
      refButton.current.setStatus(undefined);
    }

    return () => dispatch( initAccountAction() );
  }, [dispatch, reduxUpload]);

  return (
    <div className="e_profile">
      <section className="bbs_write">
        <div className="hd_titbox hd_mst1">
          <h2 className="h_tit1">
            <span>{"基本プロフィル編集"}</span>
          </h2>
        </div>

        <div className="col">
          <h3 className="tit1">{"ニックネーム"}</h3>
          <Input
            ref={refNickname}
            type="text"
            className="inp_txt w100p"
            defaultValue={reduxUserInfo?.name}
          />
        </div>

        <div className="col last">
          <h3 className="tit1">
            {`プロフィル写真登録 `}
            <button type="button" className="btn_help" title="ヘルプ">
              <ToolTip
                title={"プロフィル写真登録"}
                text={"プロファイル写真を登録してください。"}
              />
            </button>
          </h3>
          <ImageUpload
            ref={refProfile}
            className={"box_drag square "}
            previewHash={reduxUserInfo?.profileImage}
            id={"filebox1"}
          />
        </div>

        <div className="col">
          <p className="t_info">
            {"当サイトでは、直近５年間の長崎県公報の全"}
            <br className="view-m" />
          </p>
        </div>
      </section>

      <div className="bbs_write_botm">
        <Button
          ref={refButton}
          onClick={handleClickRegister}
          className="btn-pk n blue"
        >
          <span>{"登録する"}</span>
        </Button>
      </div>
    </div>
  )
}
